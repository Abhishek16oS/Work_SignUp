
import React from 'react'
import SignUpForm from './compoennt/SignUpForm'



const App = () => {
  
  return (
    <div className='min-h-screen py-2'>
      
    <SignUpForm/>
    </div>
  )
}

export default App


/* 

<?php
// Enable CORS (for React running on localhost)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

// Show PHP errors (for development only)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Connect to MySQL
$host = "localhost";
$username = "root";
$password = "";
$database = "signup_db";

$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (
    !isset($data['firstName']) ||
    !isset($data['lastName']) ||
    !isset($data['email']) ||
    !isset($data['password'])
) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit();
}

// Sanitize and hash
$firstName = $conn->real_escape_string(trim($data['firstName']));
$lastName = $conn->real_escape_string(trim($data['lastName']));
$email = $conn->real_escape_string(trim($data['email']));
$password = password_hash(trim($data['password']), PASSWORD_DEFAULT);

// Insert into database
$sql = "INSERT INTO users (firstname, lastname, email, password) VALUES ('$firstName', '$lastName', '$email', '$password')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}

// Close connection
$conn->close();
?>


*/