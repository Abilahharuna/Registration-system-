// Tab switching functionality
function showTab(tabName) {
    const contents = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');
    
    contents.forEach(content => content.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10,}$/;
    return phoneRegex.test(phone.replace(/[^0-9]/g, ''));
}

function validateFullname(fullname) {
    return fullname.trim().length >= 3 && /^[a-zA-Z\s]+$/.test(fullname);
}

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    const inputElement = errorElement.previousElementSibling;
    
    if (message) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        if (inputElement && inputElement.tagName === 'INPUT') {
            inputElement.classList.add('error');
        }
    } else {
        errorElement.classList.remove('show');
        if (inputElement && inputElement.tagName === 'INPUT') {
            inputElement.classList.remove('error');
        }
    }
}

// Show message
function showMessage(elementId, message, type) {
    const messageElement = document.getElementById(elementId);
    messageElement.textContent = message;
    messageElement.className = `message show ${type}`;
    
    setTimeout(() => {
        messageElement.classList.remove('show');
    }, 5000);
}

// Password strength checker
function checkPasswordStrength(password) {
    const strengthMeter = document.getElementById('strengthMeter');
    const strengthText = document.getElementById('strengthText');
    
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[@$!%*?&]/)) strength++;
    
    strengthMeter.classList.remove('weak', 'fair', 'strong');
    
    if (strength <= 2) {
        strengthMeter.classList.add('weak');
        strengthText.textContent = 'Weak Password';
        strengthText.style.color = '#dc3545';
    } else if (strength <= 3) {
        strengthMeter.classList.add('fair');
        strengthText.textContent = 'Fair Password';
        strengthText.style.color = '#ffc107';
    } else {
        strengthMeter.classList.add('strong');
        strengthText.textContent = 'Strong Password';
        strengthText.style.color = '#28a745';
    }
}

// Handle registration
function handleRegister(event) {
    event.preventDefault();
    
    const fullname = document.getElementById('register-fullname').value;
    const email = document.getElementById('register-email').value;
    const phone = document.getElementById('register-phone').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const terms = document.getElementById('terms').checked;
    
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error').forEach(err => err.classList.remove('show'));
    document.querySelectorAll('input').forEach(input => input.classList.remove('error'));
    
    // Validate fullname
    if (!validateFullname(fullname)) {
        showError('fullname-error', 'Full name must be at least 3 characters and contain only letters');
        isValid = false;
    }
    
    // Validate email
    if (!validateEmail(email)) {
        showError('register-email-error', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone
    if (!validatePhone(phone)) {
        showError('phone-error', 'Please enter a valid phone number (at least 10 digits)');
        isValid = false;
    }
    
    // Validate password
    if (!validatePassword(password)) {
        showError('register-password-error', 'Password must be at least 8 characters with uppercase, lowercase, number, and special character');
        isValid = false;
    }
    
    // Validate password confirmation
    if (password !== confirmPassword) {
        showError('confirm-password-error', 'Passwords do not match');
        isValid = false;
    }
    
    // Validate terms
    if (!terms) {
        showError('terms-error', 'You must agree to the terms and conditions');
        isValid = false;
    }
    
    if (isValid) {
        // Create user object
        const userData = {
            fullname: fullname,
            email: email,
            phone: phone,
            password: password,
            timestamp: new Date().toLocaleString()
        };
        
        // Save to localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if email already exists
        if (users.some(user => user.email === email)) {
            showMessage('registerMessage', 'Email already registered. Please use a different email.', 'error');
            return;
        }
        
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        
        showMessage('registerMessage', 'Registration successful! Please login with your credentials.', 'success');
        document.getElementById('registerForm').reset();
        document.getElementById('strengthMeter').classList.remove('weak', 'fair', 'strong');
        document.getElementById('strengthText').textContent = '';
        
        // Switch to login tab after 2 seconds
        setTimeout(() => {
            document.querySelector('.tab-btn').click();
        }, 2000);
    }
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;
    
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error').forEach(err => err.classList.remove('show'));
    document.querySelectorAll('input[type="email"], input[type="password"]').forEach(input => input.classList.remove('error'));
    
    // Validate email
    if (!validateEmail(email)) {
        showError('login-email-error', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    if (password.length < 6) {
        showError('login-password-error', 'Please enter your password');
        isValid = false;
    }
    
    if (isValid) {
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Store login info
            const loginInfo = {
                email: email,
                loginTime: new Date().toLocaleString()
            };
            
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            
            sessionStorage.setItem('currentUser', JSON.stringify(loginInfo));
            
            showMessage('loginMessage', `Welcome ${user.fullname}! Login successful.`, 'success');
            document.getElementById('loginForm').reset();
            
            // Redirect after 2 seconds
            setTimeout(() => {
                // You can redirect to dashboard here
                // window.location.href = 'dashboard.html';
                alert('Login successful! Redirecting to dashboard...');
            }, 2000);
        } else {
            showMessage('loginMessage', 'Invalid email or password', 'error');
        }
    }
}

// Password strength real-time check
document.getElementById('register-password')?.addEventListener('input', function() {
    checkPasswordStrength(this.value);
});

// Load remembered email on page load
window.addEventListener('load', function() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        const loginEmailInput = document.getElementById('login-email');
        if (loginEmailInput) {
            loginEmailInput.value = rememberedEmail;
            document.getElementById('remember-me').checked = true;
        }
    }
    
    // Check if user is already logged in
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        console.log('User already logged in:', user);
    }
});

// Real-time email validation
document.getElementById('register-email')?.addEventListener('blur', function() {
    if (this.value && !validateEmail(this.value)) {
        showError('register-email-error', 'Please enter a valid email address');
    } else {
        showError('register-email-error', '');
    }
});

// Real-time phone validation
document.getElementById('register-phone')?.addEventListener('blur', function() {
    if (this.value && !validatePhone(this.value)) {
        showError('phone-error', 'Please enter a valid phone number (at least 10 digits)');
    } else {
        showError('phone-error', '');
    }
});

// Confirm password real-time validation
document.getElementById('register-confirm-password')?.addEventListener('input', function() {
    const password = document.getElementById('register-password').value;
    if (this.value && this.value !== password) {
        showError('confirm-password-error', 'Passwords do not match');
    } else {
        showError('confirm-password-error', '');
    }
});