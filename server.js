// Simple Node.js Express Backend for Zephyr Campus App
// This is a learning/demo backend - stores data in JSON files

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data files
const usersFile = path.join(__dirname, 'users.json');
const feedbackFile = path.join(__dirname, 'feedback.json');

// Initialize data files if they don't exist
function initializeFiles() {
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(feedbackFile)) {
    fs.writeFileSync(feedbackFile, JSON.stringify([], null, 2));
  }
}

// Read users from file
function getUsers() {
  const data = fs.readFileSync(usersFile, 'utf8');
  return JSON.parse(data);
}

// Save users to file
function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// Read feedback from file
function getFeedback() {
  const data = fs.readFileSync(feedbackFile, 'utf8');
  return JSON.parse(data);
}

// Save feedback to file
function saveFeedback(feedback) {
  fs.writeFileSync(feedbackFile, JSON.stringify(feedback, null, 2));
}

// Simple password validation
function isValidPassword(password) {
  // Min 8 chars, at least 1 uppercase, 1 number
  return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
}

// Simple email validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ==================== ROUTES ====================

// 1. SIGNUP - Create new account
app.post('/api/auth/signup', (req, res) => {
  try {
    const { email, firstName, lastName, password, confirmPassword } = req.body;

    console.log('📝 Signup request:', { email, firstName, lastName });

    // Validate inputs
    if (!email || !firstName || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all required fields' 
      });
    }

    // Validate email
    if (!isValidEmail(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid email address' 
      });
    }

    // Validate password
    if (!isValidPassword(password)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 8 characters with 1 uppercase letter and 1 number' 
      });
    }

    // Check passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Passwords do not match' 
      });
    }

    // Get existing users
    const users = getUsers();

    // Check if email already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already registered. Please login or use a different email.' 
      });
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      firstName,
      lastName,
      password, // ⚠️ In production, hash this with bcrypt!
      createdAt: new Date().toISOString(),
      lastLogin: null
    };

    // Save user
    users.push(newUser);
    saveUsers(users);

    console.log('✅ User registered:', email);

    res.json({
      success: true,
      message: 'Account created successfully!',
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName
      }
    });

  } catch (error) {
    console.error('❌ Signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during signup' 
    });
  }
});

// 2. LOGIN - Verify credentials and login
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🔐 Login request:', { email });

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter email and password' 
      });
    }

    // Get users
    const users = getUsers();

    // Find user
    const user = users.find(u => u.email === email);
    
    // Check if user exists
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Account not found. Please sign up first.' 
      });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Incorrect password. Please try again.' 
      });
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    saveUsers(users);

    console.log('✅ User logged in:', email);

    res.json({
      success: true,
      message: 'Login successful!',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
});

// 3. GET USERS - Get all registered users (for debugging/demo)
app.get('/api/users', (req, res) => {
  try {
    const users = getUsers();
    // Return without passwords
    const safeUsers = users.map(u => ({
      id: u.id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      createdAt: u.createdAt,
      lastLogin: u.lastLogin
    }));
    res.json({ success: true, count: safeUsers.length, users: safeUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching users' });
  }
});

// 4. SUBMIT FEEDBACK - Save feedback with user info
app.post('/api/feedback/submit', (req, res) => {
  try {
    const { userId, email, firstName, lastName, locationName, rating, message } = req.body;

    console.log('📝 Feedback submission:', { email, locationName, rating });

    // Validate feedback
    if (!email || !message || !locationName) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide email, location, and message' 
      });
    }

    // Create feedback entry
    const feedback = {
      id: Date.now().toString(),
      userId: userId || null,
      email,
      firstName,
      lastName,
      locationName,
      rating: rating || 0,
      message,
      createdAt: new Date().toISOString()
    };

    // Save feedback
    const allFeedback = getFeedback();
    allFeedback.push(feedback);
    saveFeedback(allFeedback);

    console.log('✅ Feedback saved for user:', email);

    res.json({
      success: true,
      message: 'Thank you for your feedback!',
      feedback
    });

  } catch (error) {
    console.error('❌ Feedback error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error saving feedback' 
    });
  }
});

// 5. GET FEEDBACK - Get all feedback (for admin/demo)
app.get('/api/feedback', (req, res) => {
  try {
    const feedback = getFeedback();
    res.json({ 
      success: true, 
      count: feedback.length, 
      feedback 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching feedback' });
  }
});

// 6. GET USER FEEDBACK - Get feedback for specific user
app.get('/api/feedback/user/:email', (req, res) => {
  try {
    const { email } = req.params;
    const allFeedback = getFeedback();
    const userFeedback = allFeedback.filter(f => f.email === email);
    
    res.json({ 
      success: true, 
      email,
      count: userFeedback.length, 
      feedback: userFeedback 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user feedback' });
  }
});

// 7. HEALTH CHECK
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Zephyr Backend is running',
    timestamp: new Date().toISOString()
  });
});

// ==================== START SERVER ====================

// Initialize data files
initializeFiles();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  🚀 Zephyr Backend Server Running 🚀   ║
╠════════════════════════════════════════╣
║  📍 Server: http://localhost:${PORT}    ║
║  ✅ Users: ${getUsers().length} registered         ║
║  💬 Feedback: ${getFeedback().length} submissions      ║
╚════════════════════════════════════════╝
  `);
  console.log('\n📋 Available Endpoints:');
  console.log('   POST   /api/auth/signup       - Create new account');
  console.log('   POST   /api/auth/login        - Login');
  console.log('   POST   /api/feedback/submit   - Submit feedback');
  console.log('   GET    /api/users             - View all users');
  console.log('   GET    /api/feedback          - View all feedback');
  console.log('   GET    /api/feedback/user/:email - User feedback');
  console.log('   GET    /api/health            - Health check\n');
});

module.exports = app;
