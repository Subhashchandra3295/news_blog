<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require "database.php";
require __DIR__ . '/vendor/autoload.php';

// Handle incoming requests
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM articles";
    $result = $con->query($sql);

    if ($result->num_rows > 0) {
        $articles = array();
        while($row = $result->fetch_assoc()) {
            $row['image_url'] = 'C:/xampp/htdocs/' . $row['image'];
            //$row['image_url'] = 'http://localhost/' . $row['image'];
            $articles[] = $row;
        }
        echo json_encode(['status' => true, 'articles' => $articles]);
    } else {
        echo json_encode(['status' => false, 'message' => 'No articles found']);
    }
} else {
    echo json_encode(['message' => 'This endpoint only accepts GET requests']);
}
