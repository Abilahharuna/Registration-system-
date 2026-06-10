<?php
/**
 * User Login Handler
 */

header('Content-Type: application/json');
session_start();

try {
    // Get JSON input
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        throw new Exception('Invalid input');
    }
    
    $email = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';
    
    // Validation
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email address');
    }
    
    if (empty($password)) {
        throw new Exception('Password is required');
    }
    
    // Load users from file
    $users_file = 'users.json';
    if (!file_exists($users_file)) {
        throw new Exception('No users found');
    }
    
    $users = json_decode(file_get_contents($users_file), true);
    $user = null;
    
    // Find user by email
    foreach ($users as $u) {
        if ($u['email'] === $email) {
            $user = $u;
            break;
        }
    }
    
    if (!$user) {
        throw new Exception('Invalid email or password');
    }
    
    // Verify password
    if (!password_verify($password, $user['password'])) {
        throw new Exception('Invalid email or password');
    }
    
    // Set session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['user_fullname'] = $user['fullname'];
    $_SESSION['login_time'] = date('Y-m-d H:i:s');
    
    echo json_encode([
        'success' => true,
        'message' => 'Login successful',
        'user' => [
            'id' => $user['id'],
            'fullname' => $user['fullname'],
            'email' => $user['email']
        ]
    ]);
    
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>