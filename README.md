# Complete Registration System

A full-featured user registration and login system built with PHP, HTML, CSS, and JavaScript.

## Features

### 1. **User Registration**
   - Full name validation (minimum 3 characters, letters only)
   - Email validation (standard email format)
   - Phone number validation (10+ digits)
   - Password strength indicator
   - Password requirements:
     - Minimum 8 characters
     - At least 1 uppercase letter
     - At least 1 lowercase letter
     - At least 1 number
     - At least 1 special character (@$!%*?&)
   - Confirm password matching
   - Terms and conditions agreement
   - Real-time validation feedback

### 2. **User Login**
   - Email validation
   - Password verification
   - Remember me functionality
   - Session management
   - Login history tracking

### 3. **Security Features**
   - Password hashing (BCrypt)
   - Input validation on both client and server side
   - SQL injection prevention (prepared statements ready)
   - CSRF protection ready
   - Session management

### 4. **User Interface**
   - Modern, responsive design
   - Tab-based interface (Login/Register)
   - Real-time error messages
   - Password strength visualization
   - Mobile-friendly layout
   - Smooth animations and transitions

### 5. **Backend Features**
   - PHP-based registration handler
   - PHP-based login handler
   - Email availability checker
   - Logout functionality
   - File-based user storage (expandable to database)

### 6. **User Dashboard**
   - Welcome message
   - Display user information
   - Secure session-based access
   - Logout functionality

## File Structure

```
├── index.html           # Main registration/login page
├── dashboard.html       # User dashboard (after login)
├── styles.css          # Main stylesheet
├── script.js           # Client-side JavaScript
├── db_config.php       # Database configuration
├── register.php        # Registration handler
├── login.php           # Login handler
├── logout.php          # Logout handler
├── validate_email.php  # Email validation handler
└── README.md           # This file
```

## Installation

### Prerequisites
- PHP 7.0 or higher
- Web server (Apache, Nginx, etc.)
- Modern web browser

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Abilahharuna/Registration-system-.git
   cd Registration-system-
   ```

2. **Local Development (No Server Required)**
   - Simply open `index.html` in your web browser
   - The system uses localStorage for demo purposes

3. **With PHP Server**
   ```bash
   cd Registration-system-
   php -S localhost:8000
   ```
   Then open `http://localhost:8000` in your browser

4. **With Apache/Nginx**
   - Copy files to your web root
   - Access via your web server URL

## Usage

### Registration
1. Click the "Register" tab
2. Fill in all required fields:
   - Full Name (3+ characters, letters only)
   - Email (valid email format)
   - Phone Number (10+ digits)
   - Password (strong password required)
   - Confirm Password
3. Agree to terms and conditions
4. Click "Register"

### Login
1. Stay on "Login" tab or click it
2. Enter your email and password
3. (Optional) Check "Remember me" to save email
4. Click "Login"

### Password Requirements
Your password must contain:
- At least 8 characters
- One uppercase letter (A-Z)
- One lowercase letter (a-z)
- One number (0-9)
- One special character (@$!%*?&)

**Example:** `SecurePass123@`

## API Endpoints

### POST /register.php
Register a new user
```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "SecurePass123@",
  "confirm_password": "SecurePass123@"
}
```

### POST /login.php
Login a user
```json
{
  "email": "john@example.com",
  "password": "SecurePass123@"
}
```

### POST /validate_email.php
Check if email is available
```json
{
  "email": "john@example.com"
}
```

### GET /logout.php
Logout the current user

## Validation Rules

### Full Name
- Minimum 3 characters
- Only letters and spaces allowed
- Cannot be empty

### Email
- Valid email format (RFC 5322 compliant)
- Must be unique in the system
- Cannot be empty

### Phone Number
- Minimum 10 digits
- Numbers only
- Cannot be empty

### Password
- Minimum 8 characters
- Must contain uppercase (A-Z)
- Must contain lowercase (a-z)
- Must contain number (0-9)
- Must contain special character (@$!%*?&)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security Notes

1. **Password Storage**: Passwords are hashed using BCrypt algorithm
2. **Session Management**: Use sessions for authenticated users
3. **Input Validation**: All inputs validated on client and server side
4. **HTTPS**: Always use HTTPS in production
5. **Database**: Upgrade from file storage to database for production use

## Future Enhancements

- [ ] Email verification
- [ ] Two-factor authentication (2FA)
- [ ] Password reset functionality
- [ ] User profile management
- [ ] Profile picture upload
- [ ] Admin panel
- [ ] Activity logging
- [ ] Database integration (MySQL/PostgreSQL)
- [ ] OAuth integration (Google, GitHub)
- [ ] Email notifications

## Troubleshooting

### Users data not persisting
- The demo version uses localStorage (browser storage)
- For persistent storage, implement database integration
- Check browser's localStorage settings

### Password strength indicator not showing
- Ensure JavaScript is enabled
- Check browser console for errors

### Login not working
- Ensure you've registered first
- Clear browser cache and try again
- Check that localStorage has user data

## License

MIT License - Feel free to use and modify

## Support

For issues or questions, please create an issue on GitHub.

## Author

**Abilah Haruna**
- GitHub: [@Abilahharuna](https://github.com/Abilahharuna)

---

**Last Updated:** June 10, 2026
