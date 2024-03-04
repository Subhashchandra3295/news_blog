<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require "database.php";
require __DIR__ . '/vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $user_id = $data['user_id'];

    $sql = "UPDATE users SET permission=1 WHERE user_ID = '$user_id'";
    
    if(mysqli_query($con, $sql)) {
        echo json_encode(array("status" => true, "message" => "User permision has been changed."));
    } else {
        echo json_encode(array("status" => true, "message" => "Failed to change user data."));
    }
} else {
    echo json_encode(['message' => 'Wrong']);
}
