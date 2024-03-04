<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require "database.php";

// Get the data sent from the client
$data = json_decode(file_get_contents("php://input"));

// Extract article ID and flag from the data
$articleId = $data->articleId;
$flag = $data->flag;

// Update the article flag in the database
$sql = "UPDATE articles SET flag = '$flag' WHERE Id = '$articleId'";

if (mysqli_query($con, $sql)) {
    // If the update was successful, send a success response
    echo json_encode(array("status" => true, "message" => "Article flag updated successfully"));
} else {
    // If the update failed, send an error response
    echo json_encode(array("status" => false, "message" => "Failed to update article flag: " . mysqli_error($con)));
}

// Close the database connection
mysqli_close($con);
?>
