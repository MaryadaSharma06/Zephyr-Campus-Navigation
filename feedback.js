// Backend API URL
const API_URL = 'http://localhost:5000/api';

// Function to handle form submission
document.getElementById('feedbackForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value || 'Anonymous';
    const locationName = document.getElementById('location')?.value || 'Campus';
    const rating = document.getElementById('rating')?.value || 0;
    const message = document.getElementById('feedback').value;
    
    // Get user info if logged in
    const user = getCurrentUser?.() || null;
    
    const feedbackData = {
        userId: user?.id || null,
        email: user?.email || email,
        firstName: user?.firstName || name.split(' ')[0],
        lastName: user?.lastName || name.split(' ')[1] || '',
        locationName: locationName,
        rating: parseInt(rating),
        message: message
    };
    
    try {
        // Save to backend
        const response = await fetch(`${API_URL}/feedback/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedbackData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            console.log('✅ Feedback saved to backend:', data);
            
            // Hide form
            this.style.display = 'none';
            
            // Show success message with animation
            const formSection = document.querySelector('.form-section');
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.style.cssText = `
                text-align: center;
                padding: 40px 20px;
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                border-radius: 12px;
                animation: slideUp 0.5s ease-out;
            `;
            successMessage.innerHTML = `
                <div class="success-icon" style="font-size: 3rem; margin-bottom: 20px;">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3 style="font-size: 1.8rem; margin: 10px 0; color: white;">Thank You!</h3>
                <p style="font-size: 1rem; margin: 10px 0; color: rgba(255,255,255,0.95);">Your feedback has been submitted successfully.</p>
                <p style="font-size: 0.9rem; margin-top: 15px; color: rgba(255,255,255,0.8);">We appreciate your valuable input! 🎉</p>
            `;
            
            // Add success message to the form
            formSection.appendChild(successMessage);
            
            // Restore form after 5 seconds
            setTimeout(() => {
                successMessage.remove();
                this.reset();
                this.style.display = 'block';
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }, 5000);
        } else {
            throw new Error(data.message || 'Failed to submit feedback');
        }
    } catch (error) {
        console.error('❌ Feedback error:', error);
        
        // Show error message
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            background: #f8d7da;
            color: #721c24;
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 15px;
            border-left: 4px solid #f5c6cb;
        `;
        errorDiv.innerHTML = `
            <strong>⚠️ Error:</strong> ${error.message}
            <br><small>Make sure the backend is running on http://localhost:5000</small>
        `;
        
        this.insertBefore(errorDiv, this.firstChild);
        
        // Remove error after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
        
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    }
});

// Admin functionality (triggered with Ctrl+Shift+Z)
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'Z') {
        const adminPanel = document.getElementById('adminPanel') || createAdminPanel();
        adminPanel.style.display = adminPanel.style.display === 'none' ? 'block' : 'none';
    }
});

// Function to create admin panel
function createAdminPanel() {
    const panel = document.createElement('div');
    panel.id = 'adminPanel';
    panel.className = 'admin-panel';
    
    panel.innerHTML = `
        <div class="admin-header">
            <h3>Admin Panel</h3>
            <button onclick="this.parentElement.parentElement.style.display='none'">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="admin-body">
            <div class="admin-section">
                <h4>Google Sheets Setup</h4>
                <p>Current status: <span id="connectionStatus">Not configured</span></p>
                <button onclick="checkConnection()" class="admin-btn">Test Connection</button>
                <button onclick="configureSheet()" class="admin-btn">Configure</button>
            </div>
            <div class="admin-section">
                <h4>Local Data</h4>
                <p><span id="localCount">0</span> entries stored locally</p>
                <button onclick="downloadAsExcel()" class="admin-btn">Download as CSV</button>
                <button onclick="clearLocalData()" class="admin-btn warning">Clear Local Data</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(panel);
    updateLocalCount();
    return panel;
}

// Function to check the count of local entries
function updateLocalCount() {
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    const localCount = document.getElementById('localCount');
    if (localCount) {
        localCount.textContent = feedbacks.length;
    }
    
    // Update download button visibility
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.style.display = feedbacks.length > 0 ? 'block' : 'none';
    }
}

// Function to download feedback as Excel (CSV format)
function downloadAsExcel() {
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');

    if (feedbacks.length === 0) {
        alert('No feedback available to download.');
        return;
    }

    // Create CSV content
    let csvContent = "Name,Email,Feedback,How did you find us,Timestamp\n";
    feedbacks.forEach(feedback => {
        // Escape commas in fields
        const escapedFeedback = feedback.feedback.replace(/,/g, ' ');
        csvContent += `${feedback.name},${feedback.email},${escapedFeedback},${feedback.source},${feedback.timestamp}\n`;
    });

    // Create and download the CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "feedback_data.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Function to clear local data
function clearLocalData() {
    if (confirm('Are you sure you want to clear all locally stored feedback? This cannot be undone.')) {
        localStorage.removeItem('feedbacks');
        updateLocalCount();
        alert('Local data cleared successfully.');
    }
}

// Function to check Google Sheets connection
function checkConnection() {
    const connectionStatus = document.getElementById('connectionStatus');
    connectionStatus.textContent = 'Checking...';
    
    const scriptURL = 'YOUR_GOOGLE_SCRIPT_URL';
    
    fetch(scriptURL + '?action=test', {
        method: 'GET',
        mode: 'no-cors',
    })
    .then(() => {
        connectionStatus.textContent = 'Connected';
        connectionStatus.className = 'connected';
    })
    .catch(() => {
        connectionStatus.textContent = 'Connection Failed';
        connectionStatus.className = 'disconnected';
    });
}

// Function to help configure Google Sheet
function configureSheet() {
    const modal = document.createElement('div');
    modal.className = 'config-modal';
    
    modal.innerHTML = `
        <div class="config-content">
            <h3>Google Sheets Configuration</h3>
            <ol>
                <li>Go to <a href="https://script.google.com" target="_blank">Google Apps Script</a></li>
                <li>Create a new project</li>
                <li>Copy and paste the Apps Script code provided below</li>
                <li>Save the project and click on "Deploy" > "New deployment"</li>
                <li>Select "Web app" as the deployment type</li>
                <li>Set "Who has access" to "Anyone"</li>
                <li>Click "Deploy" and copy the web app URL</li>
                <li>Replace 'YOUR_GOOGLE_SCRIPT_URL' in the feedback.js file with your URL</li>
            </ol>
            
            <div class="code-container">
                <pre><code>
function doGet(e) {
  // Test connection if requested
  if (e.parameter.action === 'test') {
    return ContentService.createTextOutput('Connection successful');
  }
  
  // Process the form submission
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Get parameters from the request
  var name = e.parameter.name || 'No Name';
  var email = e.parameter.email || 'No Email';
  var feedback = e.parameter.feedback || 'No Feedback';
  var source = e.parameter.source || 'Not Specified';
  var timestamp = e.parameter.timestamp || new Date().toLocaleString();
  
  // Add a new row to the spreadsheet
  sheet.appendRow([timestamp, name, email, feedback, source]);
  
  // Return success response
  return ContentService.createTextOutput('Success!');
}
                </code></pre>
            </div>
            
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Check local storage for feedbacks on load
window.addEventListener('load', function() {
    updateLocalCount();
    
    // Add form field validation
    const nameField = document.getElementById('name');
    const feedbackField = document.getElementById('feedback');
    const emailField = document.getElementById('email');
    
    // Add validation styles
    [nameField, feedbackField, emailField].forEach(field => {
        if (!field) return;
        
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                validateField(this);
            }
        });
    });
});

// Function to validate a field
function validateField(field) {
    if (field.required && !field.value.trim()) {
        field.classList.add('invalid');
        
        // Show error message if it doesn't exist
        let errorMsg = field.parentElement.querySelector('.error-msg');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-msg';
            errorMsg.textContent = 'This field is required';
            field.parentElement.appendChild(errorMsg);
        }
    } else if (field.type === 'email' && field.value.trim() && !validateEmail(field.value)) {
        field.classList.add('invalid');
        
        // Show error message if it doesn't exist
        let errorMsg = field.parentElement.querySelector('.error-msg');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-msg';
            errorMsg.textContent = 'Please enter a valid email address';
            field.parentElement.appendChild(errorMsg);
        }
    } else {
        field.classList.remove('invalid');
        
        // Remove error message if it exists
        const errorMsg = field.parentElement.querySelector('.error-msg');
        if (errorMsg) {
            field.parentElement.removeChild(errorMsg);
        }
    }
}

// Function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}