<?php
/**
 * User Registration Handler
 */

header('Content-Type: application/json');

try {
    // Get JSON input
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        throw new Exception('Invalid input');
    }
    
    // Extract data
    $fullname = trim($data['fullname'] ?? '');
    $email = trim($data['email'] ?? '');
    $phone = trim($data['phone'] ?? '');
    $password = $data['password'] ?? '';
    $confirm_password = $data['confirm_password'] ?? '';
    
    // Validation
    $errors = [];
    
    if (empty($fullname)) {
        $errors['fullname'] = 'Full name is required';
    } elseif (strlen($fullname) < 3) {
        $errors['fullname'] = 'Full name must be at least 3 characters';
    } elseif (!preg_match('/^[a-zA-Z\s]+$/', $fullname)) {
        $errors['fullname'] = 'Full name can only contain letters and spaces';
    }
    
    if (empty($email)) {
        $errors['email'] = 'Email is required';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email format';
    }
    
    if (empty($phone)) {
        $errors['phone'] = 'Phone number is required';
    } elseif (!preg_match('/^[0-9]{10,}$/', preg_replace('/[^0-9]/', '', $phone))) {
        $errors['phone'] = 'Invalid phone number';
    }
    
    if (empty($password)) {
        $errors['password'] = 'Password is required';
    } elseif (strlen($password) < 8) {
        $errors['password'] = 'Password must be at least 8 characters';
    } elseif (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/', $password)) {
        $errors['password'] = 'Password must contain uppercase, lowercase, number, and special character';
    }
    
    if ($password !== $confirm_password) {
        $errors['confirm_password'] = 'Passwords do not match';
    }
    
    if (!empty($errors)) {
        echo json_encode([
            'success' => false,
            'errors' => $errors
        ]);
        exit;
    }
    
    // Here you would typically:
    // 1. Check if email already exists in database
    // 2. Hash the password
    // 3. Insert user into database
    
    // For demonstration (using file storage):
    $users_file = 'users.json';
    $users = file_exists($users_file) ? json_decode(file_get_contents($users_file), true) : [];
    
    // Check if email exists
    foreach ($users as $user) {
        if ($user['email'] === $email) {
            throw new Exception('Email already registered');
        }
    }
    
    // Create new user
    $new_user = [
        'id' => uniqid(),
        'fullname' => $fullname,
        'email' => $email,
        'phone' => $phone,
        'password' => password_hash($password, PASSWORD_BCRYPT),
        'created_at' => date('Y-m-d H:i:s'),
        'verified' => false
    ];
    
    $users[] = $new_user;
    file_put_contents($users_file, json_encode($users, JSON_PRETTY_PRINT));
    
    echo json_encode([
        'success' => true,
        'message' => 'Registration successful! Please login.'
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>