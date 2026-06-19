// Backend API URL (change this if backend is on different port/server)
const API_URL = 'http://localhost:5000/api';

// Form Switching
function switchForm(e) {
  e.preventDefault();
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  
  loginForm.classList.toggle('active');
  signupForm.classList.toggle('active');
}

// Toggle Password Visibility
function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  const button = event.target.closest('.toggle-password');
  const icon = button.querySelector('i');
  
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

// Handle Login - Call Backend API
document.getElementById('loginFormElement').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  // Validation
  if (!email || !password) {
    showError('Please fill in all fields');
    return;
  }
  
  try {
    showLoading('Logging in...');
    
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    hideLoading();
    
    if (data.success) {
      // Store user login state from backend response
      setUserLoggedIn(data.user.email, data.user.firstName, data.user.lastName);
      
      showSuccessModal(
        'Welcome Back!',
        'You have successfully signed in. Redirecting to homepage...',
        () => window.location.href = 'index.html'
      );
    } else {
      showError(data.message || 'Login failed');
    }
    
  } catch (error) {
    hideLoading();
    console.error('Login error:', error);
    showError('Could not connect to server. Make sure backend is running on http://localhost:5000');
  }
});

// Handle Signup - Call Backend API
document.getElementById('signupFormElement').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const firstName = document.getElementById('signup-fname').value;
  const lastName = document.getElementById('signup-lname').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm').value;
  const termsAccepted = document.querySelector('input[name="terms"]').checked;
  
  // Validation
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    showError('Please fill in all fields');
    return;
  }
  
  if (password.length < 8) {
    showError('Password must be at least 8 characters long');
    return;
  }
  
  if (password !== confirmPassword) {
    showError('Passwords do not match');
    return;
  }
  
  if (!termsAccepted) {
    showError('Please accept the Terms & Conditions');
    return;
  }
  
  if (!validatePassword(password)) {
    showError('Password must contain at least 1 uppercase letter and 1 number');
    return;
  }
  
  try {
    showLoading('Creating account...');
    
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, firstName, lastName, password, confirmPassword })
    });
    
    const data = await response.json();
    hideLoading();
    
    if (data.success) {
      // Store user login state from backend response
      setUserLoggedIn(data.user.email, data.user.firstName, data.user.lastName);
      
      showSuccessModal(
        'Account Created Successfully!',
        'Welcome to Zephyr! Your account has been created. Redirecting to homepage...',
        () => window.location.href = 'index.html'
      );
    } else {
      showError(data.message || 'Signup failed');
    }
    
  } catch (error) {
    hideLoading();
    console.error('Signup error:', error);
    showError('Could not connect to server. Make sure backend is running on http://localhost:5000');
  }
});

// Validate Password Strength
function validatePassword(password) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return hasUpperCase && hasNumber;
}

// Show Error Message
function showError(message) {
  // Create error message element if it doesn't exist
  let errorElement = document.querySelector('.error-message');
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    const formContainer = document.querySelector('.auth-form.active');
    formContainer.insertBefore(errorElement, formContainer.firstChild);
  }
  
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    errorElement.style.display = 'none';
  }, 5000);
}

// Show Loading Message
function showLoading(message = 'Loading...') {
  let loadingElement = document.querySelector('.loading-message');
  if (!loadingElement) {
    loadingElement = document.createElement('div');
    loadingElement.className = 'loading-message';
    const formContainer = document.querySelector('.auth-form.active');
    formContainer.insertBefore(loadingElement, formContainer.firstChild);
  }
  
  loadingElement.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px;">
      <div style="width: 20px; height: 20px; border: 3px solid #ddd; border-top: 3px solid #0066cc; border-radius: 50%; animation: spin 1s linear infinite;"></div>
      <span>${message}</span>
    </div>
  `;
  loadingElement.style.display = 'block';
}

// Hide Loading Message
function hideLoading() {
  const loadingElement = document.querySelector('.loading-message');
  if (loadingElement) {
    loadingElement.style.display = 'none';
  }
}

// Show Success Modal
function showSuccessModal(title, message, callback) {
  const modal = document.getElementById('successModal');
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalMessage').textContent = message;
  modal.classList.add('show');
  
  // Store callback for later use
  window.modalCallback = callback;
}

// Close Modal
function closeModal() {
  const modal = document.getElementById('successModal');
  modal.classList.remove('show');
}

// Handle Modal Action
function handleModalAction() {
  if (window.modalCallback) {
    window.modalCallback();
  }
}

// Social Auth Handlers
function handleGoogleAuth() {
  console.log('Google auth initiated');
  alert('Google authentication would be implemented here');
}

function handleMicrosoftAuth() {
  console.log('Microsoft auth initiated');
  alert('Microsoft authentication would be implemented here');
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
  const modal = document.getElementById('successModal');
  if (event.target === modal) {
    closeModal();
  }
});

// Add enter key support for form submission
document.getElementById('loginFormElement').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    this.dispatchEvent(new Event('submit'));
  }
});

document.getElementById('signupFormElement').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    this.dispatchEvent(new Event('submit'));
  }
});

// Password match validation for signup
document.getElementById('signup-confirm').addEventListener('change', function() {
  const password = document.getElementById('signup-password').value;
  const confirmPassword = this.value;
  
  if (password && confirmPassword && password !== confirmPassword) {
    this.style.borderColor = '#ef4444';
  } else {
    this.style.borderColor = '';
  }
});

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Enhanced form validation
document.getElementById('login-email').addEventListener('blur', function() {
  if (this.value && !isValidEmail(this.value)) {
    showError('Please enter a valid email address');
  }
});

document.getElementById('signup-email').addEventListener('blur', function() {
  if (this.value && !isValidEmail(this.value)) {
    showError('Please enter a valid email address');
  }
});

// Add loading state to buttons
function setButtonLoading(button, isLoading) {
  if (isLoading) {
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
  } else {
    button.disabled = false;
    button.innerHTML = button.textContent;
  }
}
