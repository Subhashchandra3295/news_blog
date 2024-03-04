<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require "database.php";
use \Firebase\JWT\JWT;
require __DIR__ . '/vendor/autoload.php';

// Handle incoming requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $folderPath = "uploads/";
    $postdata = file_get_contents("php://input");
    $date = date("Y/m/d");   
    if(!empty($postdata)){
        $request = json_decode($postdata);
        $comments = $request->comments;
        $user_id = $request->user_ID;
        $news_id = $request->news_id;
        $date = date("Y/m/d");

        foreach ($comments as $comment) {
            $sql = "INSERT INTO comments (comments, user_id, news_id, date, status) VALUES ('$comment', '$user_id', '$news_id', '$date', 1)";
    
            if ($con->query($sql) !== TRUE) {
                echo json_encode(array('status'=>false,'msg'=>'Failed to upload comments'));
                exit;
            }
        }

        echo json_encode(array('status'=>true,'msg'=>'Comments uploaded!'));
    } else {
        echo json_encode(array('status'=>false,'msg'=>'No comments provided'));
    }
} else {
    echo json_encode(['message' => 'This endpoint only accepts POST requests']);
}
?>
