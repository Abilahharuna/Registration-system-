<?php
/**
 * Database Configuration File
 * This file contains database connection settings
 */

// Database credentials
define('DB_SERVER', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'registration_system');

// Attempt to connect to MySQL database
try {
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_NAME);
    
    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
    
    // Set charset to utf8
    $conn->set_charset("utf8");
    
} catch (Exception $e) {
    die("Database Connection Error: " . $e->getMessage());
}
?>