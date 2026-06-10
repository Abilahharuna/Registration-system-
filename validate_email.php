<?php
/**
 * Email Validation Handler
 * Checks if email is already registered
 */

header('Content-Type: application/json');

try {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = trim($data['email'] ?? '');
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email format');
    }
    
    // Check in users file
    $users_file = 'users.json';
    if (file_exists($users_file)) {
        $users = json_decode(file_get_contents($users_file), true);
        foreach ($users as $user) {
            if ($user['email'] === $email) {
                echo json_encode([
                    'available' => false,
                    'message' => 'Email already registered'
                ]);
                exit;
            }
        }
    }
    
    echo json_encode([
        'available' => true,
        'message' => 'Email is available'
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>