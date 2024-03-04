<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require "database.php";
require __DIR__ . '/vendor/autoload.php';

// Handle incoming requests
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $news_id = $_GET['news_id'];
    $sql = "SELECT * FROM comments WHERE news_id = '$news_id'";
    $result = $con->query($sql);

    if ($result->num_rows > 0) {
        $comments = array();
        while($row = $result->fetch_assoc()) {
            $comments[] = $row;
        }
        $response = array('status' => true, 'comments' => $comments);
    } else {
        $response = array('status' => false, 'msg' => 'No comments found for the given news_id');
    }
    echo json_encode($response);
} else {
    echo json_encode(['message' => 'This endpoint only accepts GET requests']);
}
?>
