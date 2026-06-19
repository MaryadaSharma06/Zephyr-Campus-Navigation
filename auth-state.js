// ==================== Authentication State Management ====================

/**
 * Check if user is logged in
 */
function isUserLoggedIn() {
  return localStorage.getItem('zephyrUserLoggedIn') === 'true';
}

/**
 * Get current user info
 */
function getCurrentUser() {
  const userInfo = localStorage.getItem('zephyrUserInfo');
  return userInfo ? JSON.parse(userInfo) : null;
}

/**
 * Set user as logged in
 */
function setUserLoggedIn(email, firstName = '', lastName = '') {
  localStorage.setItem('zephyrUserLoggedIn', 'true');
  const userInfo = {
    email: email,
    firstName: firstName || 'User',
    lastName: lastName || '',
    loginTime: new Date().toISOString()
  };
  localStorage.setItem('zephyrUserInfo', JSON.stringify(userInfo));
  console.log('✅ User logged in:', userInfo);
  console.log('localStorage data:', {
    zephyrUserLoggedIn: localStorage.getItem('zephyrUserLoggedIn'),
    zephyrUserInfo: localStorage.getItem('zephyrUserInfo')
  });
}

/**
 * Logout user
 */
function logoutUser() {
  localStorage.removeItem('zephyrUserLoggedIn');
  localStorage.removeItem('zephyrUserInfo');
  updateNavbarAuthState();
  // Redirect to login page after 1 second
  setTimeout(() => {
    window.location.href = 'login-signup.html';
  }, 500);
}

/**
 * Update navbar based on authentication state
 */
function updateNavbarAuthState() {
  const navLinks = document.querySelector('.nav-links');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  console.log('🔍 updateNavbarAuthState called');
  console.log('navLinks:', navLinks);
  console.log('mobileMenu:', mobileMenu);
  
  if (!navLinks) {
    console.warn('⚠️ .nav-links not found!');
    return;
  }
  
  const isLoggedIn = isUserLoggedIn();
  const user = getCurrentUser();
  
  console.log('📊 Auth State:', { isLoggedIn, user });
  
  // Find auth button containers
  const authButtonDesktop = navLinks.querySelector('a[href="login-signup.html"]');
  const authButtonMobile = mobileMenu ? mobileMenu.querySelector('a[href="login-signup.html"]') : null;
  
  console.log('🔘 Auth buttons found:', { authButtonDesktop, authButtonMobile });
  
  if (isLoggedIn && user) {
    // User is logged in - show logout button
    if (authButtonDesktop) {
      authButtonDesktop.outerHTML = `
        <div class="user-menu">
          <button class="user-profile-btn">
            <i class="fas fa-user-circle"></i>
            <span>${user.firstName || user.email.split('@')[0]}</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="user-dropdown">
            <div class="user-info">
              <p class="user-name">${user.firstName} ${user.lastName || ''}</p>
              <p class="user-email">${user.email}</p>
            </div>
            <hr>
            <a href="#" class="dropdown-item">
              <i class="fas fa-user"></i> Profile
            </a>
            <a href="#" class="dropdown-item">
              <i class="fas fa-cog"></i> Settings
            </a>
            <a href="#" class="dropdown-item">
              <i class="fas fa-question-circle"></i> Help
            </a>
            <hr>
            <a href="#" class="dropdown-item logout-item" onclick="logoutUser(); return false;">
              <i class="fas fa-sign-out-alt"></i> Logout
            </a>
          </div>
        </div>
      `;
      
      // Add dropdown toggle event listener
      const profileBtn = navLinks.querySelector('.user-profile-btn');
      if (profileBtn) {
        profileBtn.addEventListener('click', toggleUserDropdown);
      }
    }
    
    if (authButtonMobile && mobileMenu) {
      authButtonMobile.outerHTML = `
        <div class="user-menu-mobile">
          <div class="mobile-user-info">
            <i class="fas fa-user-circle"></i>
            <div>
              <p class="user-name">${user.firstName} ${user.lastName || ''}</p>
              <p class="user-email">${user.email}</p>
            </div>
          </div>
          <a href="#" class="mobile-menu-item">
            <i class="fas fa-user"></i> Profile
          </a>
          <a href="#" class="mobile-menu-item">
            <i class="fas fa-cog"></i> Settings
          </a>
          <a href="#" class="mobile-menu-item">
            <i class="fas fa-question-circle"></i> Help
          </a>
          <button class="mobile-logout-btn" onclick="logoutUser(); return false;">
            <i class="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      `;
    }
  } else {
    // User is not logged in - show login button
    if (authButtonDesktop) {
      authButtonDesktop.outerHTML = `
        <a href="login-signup.html">
          <button class="sign-in-btn">LOGIN / SIGNUP</button>
        </a>
      `;
    }
    
    if (authButtonMobile && mobileMenu) {
      authButtonMobile.outerHTML = `
        <a href="login-signup.html">
          <button class="sign-in-btn">LOGIN / SIGNUP</button>
        </a>
      `;
    }
  }
}

/**
 * Toggle user dropdown menu
 */
function toggleUserDropdown(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  const dropdown = document.querySelector('.user-dropdown');
  const btn = document.querySelector('.user-profile-btn');
  
  if (dropdown) {
    dropdown.classList.toggle('active');
    if (btn) {
      btn.classList.toggle('active');
    }
  }
}

/**
 * Close dropdown when clicking outside
 */
document.addEventListener('click', function(event) {
  const userMenu = document.querySelector('.user-menu');
  const userBtn = document.querySelector('.user-profile-btn');
  const dropdown = document.querySelector('.user-dropdown');
  
  // If clicking on the button itself, let toggleUserDropdown handle it
  if (userBtn && userBtn.contains(event.target)) {
    return;
  }
  
  // Close dropdown if clicking outside
  if (userMenu && !userMenu.contains(event.target) && dropdown) {
    dropdown.classList.remove('active');
    if (userBtn) {
      userBtn.classList.remove('active');
    }
  }
});

/**
 * Initialize auth state on page load
 */
function initializeAuthState() {
  console.log('🚀 initializeAuthState called');
  console.log('DOM Ready State:', document.readyState);
  
  // Update navbar on page load
  updateNavbarAuthState();
  
  // Setup mobile menu close on link click
  setupMobileMenuCloseOnNavigation();
  
  // Setup navbar scroll effect
  setupNavbarScrollEffect();
  
  console.log('✨ Auth state initialization complete');
}

/**
 * Setup mobile menu to close when clicking navigation links
 */
function setupMobileMenuCloseOnNavigation() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuBtn = document.querySelector('.menu-btn');
  
  if (!mobileMenu || !menuBtn) return;
  
  // Close menu when clicking any link
  const links = mobileMenu.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      // Don't close if clicking logout (it handles its own redirect)
      if (!link.classList.contains('logout-item')) {
        closeMobileMenu(menuBtn, mobileMenu);
      }
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      closeMobileMenu(menuBtn, mobileMenu);
    }
  });
}

/**
 * Close mobile menu
 */
function closeMobileMenu(menuBtn, mobileMenu) {
  if (mobileMenu.style.display !== 'none') {
    menuBtn.click();
  }
}

/**
 * Setup navbar scroll effect for sticky positioning
 */
function setupNavbarScrollEffect() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAuthState);
} else {
  initializeAuthState();
}
