# 🚀 Zephyr Backend Setup Guide

## Overview

Your Zephyr app now has a **backend server** that:

✅ **Validates user accounts** - Only existing users can login  
✅ **Stores user data** - Accounts are permanently saved  
✅ **Saves feedback** - Feedback is linked to user accounts  
✅ **Prevents duplicate signups** - Can't create account with same email twice  
✅ **Validates passwords** - Must be 8+ chars, 1 uppercase, 1 number  

---

## 📋 Prerequisites

You need **Node.js** installed on your computer.

### Check if Node.js is installed:
```bash
node --version
npm --version
```

If not installed, download from: https://nodejs.org/

---

## ⚙️ Setup Steps

### Step 1: Install Dependencies

Navigate to the Zephyr folder in terminal and run:

```bash
cd e:\Downloads\ZEPHYR-main\ZEPHYR-main
npm install
```

This will install:
- **express** - Web server framework
- **cors** - Allow frontend to call backend
- **body-parser** - Parse JSON requests

### Step 2: Start the Backend Server

```bash
npm start
```

You should see:
```
╔════════════════════════════════════════╗
║  🚀 Zephyr Backend Server Running 🚀   ║
╠════════════════════════════════════════╣
║  📍 Server: http://localhost:5000    ║
║  ✅ Users: 0 registered         ║
║  💬 Feedback: 0 submissions      ║
╚════════════════════════════════════════╝
```

### Step 3: Test the Backend

Open browser and visit:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "OK",
  "message": "Zephyr Backend is running",
  "timestamp": "2026-06-19T10:30:00..."
}
```

✅ **Backend is running!**

### Step 4: Use the App

Now open your Zephyr app in browser:
```
e:\Downloads\ZEPHYR-main\ZEPHYR-main\login-signup.html
```

Try:
1. **Sign Up** - Create account with password 8+ chars, 1 uppercase, 1 number
2. **Login** - Use account you just created
3. **Submit Feedback** - Feedback is saved with your account info

---

## 📁 Data Files

Your data is stored in JSON files (simple database):

### `users.json`
Stores all registered user accounts:
```json
[
  {
    "id": "1718784600000",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "password": "Password123",
    "createdAt": "2026-06-19T10:30:00Z",
    "lastLogin": "2026-06-19T10:35:00Z"
  }
]
```

### `feedback.json`
Stores all feedback submissions:
```json
[
  {
    "id": "1718784605000",
    "userId": "1718784600000",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "locationName": "Library",
    "rating": 5,
    "message": "Great library facility!",
    "createdAt": "2026-06-19T10:35:00Z"
  }
]
```

---

## 🔌 API Endpoints

### 1. **Signup** - Create new account
```
POST /api/auth/signup

Body:
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "Password123",
  "confirmPassword": "Password123"
}

Response:
{
  "success": true,
  "message": "Account created successfully!",
  "user": {
    "id": "1718784600000",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### 2. **Login** - Authenticate user
```
POST /api/auth/login

Body:
{
  "email": "user@example.com",
  "password": "Password123"
}

Response:
{
  "success": true,
  "message": "Login successful!",
  "user": {
    "id": "1718784600000",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "createdAt": "2026-06-19T10:30:00Z"
  }
}
```

### 3. **Submit Feedback**
```
POST /api/feedback/submit

Body:
{
  "userId": "1718784600000",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "locationName": "Library",
  "rating": 5,
  "message": "Great facility!"
}

Response:
{
  "success": true,
  "message": "Thank you for your feedback!",
  "feedback": { ... }
}
```

### 4. **View All Users** (Admin/Demo)
```
GET /api/users

Response:
{
  "success": true,
  "count": 2,
  "users": [ ... ]
}
```

### 5. **View All Feedback** (Admin/Demo)
```
GET /api/feedback

Response:
{
  "success": true,
  "count": 5,
  "feedback": [ ... ]
}
```

### 6. **View User's Feedback**
```
GET /api/feedback/user/:email

Example:
GET /api/feedback/user/john@example.com

Response:
{
  "success": true,
  "email": "john@example.com",
  "count": 3,
  "feedback": [ ... ]
}
```

---

## 🧪 Testing with Postman

You can test API endpoints using **Postman** (free tool):

### Install Postman:
1. Download from https://www.postman.com/downloads/
2. Install and open

### Test Signup:
1. Click **+** to create new request
2. Set method to **POST**
3. Enter URL: `http://localhost:5000/api/auth/signup`
4. Click **Body** tab
5. Select **raw** and **JSON**
6. Paste:
```json
{
  "email": "test@example.com",
  "firstName": "Test",
  "lastName": "User",
  "password": "TestPassword123",
  "confirmPassword": "TestPassword123"
}
```
7. Click **Send**

---

## 🐛 Troubleshooting

### ❌ "Cannot connect to server"
- Make sure backend is running (`npm start`)
- Check port 5000 is not blocked
- Try: `http://localhost:5000/api/health`

### ❌ "Email already exists"
- That email is already registered
- Use different email or check `users.json`

### ❌ "Account not found"
- Email doesn't exist in database
- Must sign up first before logging in

### ❌ "Incorrect password"
- Password doesn't match
- Check `users.json` or reset with signup

### ❌ Node modules not found
- Run: `npm install` in project folder
- Make sure you're in correct directory

### ❌ Port 5000 already in use
- Another app is using port 5000
- Close other apps or change PORT in `server.js`

---

## 📊 View Your Data

### Method 1: View in Files
Open these files in VS Code:
- `users.json` - See all registered users
- `feedback.json` - See all feedback submissions

### Method 2: API in Browser
Visit these URLs in browser:
- `http://localhost:5000/api/users`
- `http://localhost:5000/api/feedback`
- `http://localhost:5000/api/feedback/user/john@example.com`

---

## 🔐 Security Notes (Demo Only)

**⚠️ This demo setup is NOT secure for production:**

- ❌ Passwords stored in plain text (use bcrypt in production)
- ❌ No HTTPS/SSL encryption (use in production)
- ❌ No database (use MongoDB, PostgreSQL, etc.)
- ❌ No rate limiting (add for production)
- ❌ No authentication tokens (use JWT in production)

**For production, you'd need:**
- Hash passwords with bcrypt
- Use HTTPS/SSL
- Use real database
- Add JWT authentication
- Add rate limiting
- Add input validation

---

## 🚀 Next Steps

1. **Test signup/login:**
   - Make sure server is running
   - Create account with strong password
   - Login should only work with registered accounts
   - Feedback is saved with your info

2. **Add more features:**
   - User profile page (edit account)
   - Change password
   - Delete account
   - View my feedback

3. **Deploy backend:**
   - Move to real server (AWS, Heroku, etc.)
   - Use real database
   - Add security features

---

## 📞 Quick Reference

### Start backend:
```bash
npm start
```

### Stop backend:
```bash
Ctrl + C
```

### Install dependencies:
```bash
npm install
```

### View users:
```
http://localhost:5000/api/users
```

### View feedback:
```
http://localhost:5000/api/feedback
```

---

## ✅ Checklist

- [ ] Node.js installed
- [ ] npm install completed
- [ ] npm start running
- [ ] Backend responding at /api/health
- [ ] Can sign up with new account
- [ ] Can login with created account
- [ ] Cannot login with wrong password
- [ ] Cannot login with non-existent email
- [ ] Can submit feedback (logged in)
- [ ] Feedback appears in feedback.json
- [ ] Can view users at /api/users
- [ ] Can view feedback at /api/feedback

---

**Your backend is ready!** 🎉

Server stores data in JSON files. When you create accounts or submit feedback, they're saved permanently until you delete the JSON files.

Next step: Test login/signup flow and watch data get saved! 🚀
