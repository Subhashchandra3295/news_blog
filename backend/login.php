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

    if (isset($data['email']) && isset($data['password'])) {
        $email = $data['email'];
        $password = $data['password'];
        $date = date("Y/m/d");
        
        $getstatus =$con->prepare("SELECT users.role, users.user_ID, users.name, users.password FROM users where users.email ='$email'");
        $getstatus->execute();
        $result = $getstatus->get_result();

        while($row = $result->fetch_assoc()){
            $user_status = $row['role'];
            if($user_status == null){
                $user_status = "Access Denied!";
            }
            $user_id=  $row['user_ID'];
            if($user_id == null){
                $user_id = "Access Denied!";
            }
            $user_name=  $row['name'];
            if($user_name == null){
                $user_name = "Access Denied!";
            }
        }

        $last_login_date = "UPDATE users SET `last_login_date`='$date' WHERE `user_ID` = '$user_id'";
        mysqli_query($con, $last_login_date);
        
        if($user_status == "ADMIN"){
            $gethashpassword =$con->prepare("SELECT users.password FROM users where users.email ='$email'");
            $gethashpassword->execute();
            $result_hash = $gethashpassword->get_result();
            
            while($row = $result_hash->fetch_assoc()){
                $Hash_Password=  $row['password'];
            }
            if (password_verify($password, $Hash_Password)) {
                $payload = [
                'iat' => time(),
                'iss' => 'localhost',
                'exp' => time() + (5*600000),
                'user_id' => $user_id,
                "role" => 'ADMIN'
                ];
                $token = JWT::encode($payload, "SECRETE_KEY", "HS256");
                echo json_encode(
                array(
                    "message" => "Successful login!",
                    "token" => $token,
                    "email" => $email,
                    'user_id' => $user_id,
                    'user_name' => $user_name,
                    "role" => 'ADMIN'
                ));
            }
        }elseif($user_status == "registered_user"){
            $gethashpassword =$con->prepare("SELECT users.password FROM users where users.email ='$email'");
            $gethashpassword->execute();
            $result_hash = $gethashpassword->get_result();
            
            while($row = $result_hash->fetch_assoc()){
                $Hash_Password=  $row['password'];
            }
            if (password_verify($password, $Hash_Password)) {
                $payload = [
                'iat' => time(),
                'iss' => 'localhost',
                'exp' => time() + (5*600000),
                'user_id' => $user_id,
                "role" => 'registered_user'
                ];
                $token = JWT::encode($payload, "SECRETE_KEY", "HS256");
                echo json_encode(
                array(
                    "message" => "Successful login!",
                    "token" => $token,
                    "email" => $email,
                    'user_id' => $user_id,
                    'user_name' => $user_name,
                    "role" => 'registered_user'
                ));
            }
        }else{
            $gethashpassword =$con->prepare("SELECT users.password FROM users where users.email ='$email'");
            $gethashpassword->execute();
            $result_hash = $gethashpassword->get_result();
            
            while($row = $result_hash->fetch_assoc()){
                $Hash_Password=  $row['password'];
            }
            if (password_verify($password, $Hash_Password)) {
                $payload = [
                'iat' => time(),
                'iss' => 'localhost',
                'exp' => time() + (5*600000),
                'user_id' => $user_id,
                "role" => 'user'
                ];
                $token = JWT::encode($payload, "SECRETE_KEY", "HS256");
                echo json_encode(
                array(
                    "message" => "Successful login!",
                    "token" => $token,
                    "email" => $email,
                    'user_id' => $user_id,
                    'user_name' => $user_name,
                    "role" => 'user'
                ));
            }
        }
    } else {
        echo json_encode(['error' => 'Email and password not provided']);
    }
} else {
    echo json_encode(['message' => 'This endpoint only accepts POST requests']);
}
?>