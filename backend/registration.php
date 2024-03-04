<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

use \Firebase\JWT\JWT;
require __DIR__ . '/vendor/autoload.php';
require "database.php";

// Handle incoming requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['useremail']) && isset($data['userpassword'])) {
        $email = $data['useremail'];
        $password = $data['userpassword'];
        $name = $data['username'];
        $date = date("Y/m/d");
        
        // Hash the password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        
        $sql = "INSERT INTO users (name, email, password, permission, role, last_login_date) VALUES ('$name', '$email', '$hashed_password', 1, 'user', '$date')";

        // Execute the query
        if ($con->query($sql) === TRUE) {
            $payload = [
                'iat' => time(),
                'iss' => 'localhost',
                'exp' => time() + (5*600000),
                'user_id' => $con->insert_id,
                "role" => 'user'
                ];
                $token = JWT::encode($payload, "SECRETE_KEY", "HS256");
                echo json_encode(
                array(
                    "message" => "Successful login!",
                    "token" => $token,
                    "email" => $email,
                    'user_id' => $con->insert_id,
                    'user_name' => $name,
                    "role" => 'user'
                ));
        } else {
            echo json_encode(
                array(
                    "message" => "Successful login!",
                    "token" => "",
                    "email" => "",
                    "role" => ""
                ));
        }
    } else {
        echo json_encode(['error' => 'Please contact us to get an access to this platform']);
    }
} else {
    echo json_encode(['message' => 'Please contact us to get an access to this platform']);
}
?>
