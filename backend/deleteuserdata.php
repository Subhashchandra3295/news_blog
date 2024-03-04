<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require "database.php";
require __DIR__ . '/vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $user_id = $data['user_id'];

    $sql = "DELETE FROM users WHERE user_ID = '$user_id'";

    if(mysqli_query($con, $sql)) {
        echo json_encode(array("status" => true, "message" => "User data deleted successfully."));
    } else {
        echo json_encode(array("status" => true, "message" => "Failed to delete user data."));
    }
} else {
    echo json_encode(['message' => 'Wrong']);
}
?>