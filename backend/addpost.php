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
    // echo "<pre>";
    // print_r($postdata);
    // die;
    $date = date("Y/m/d");   
    if(!empty($postdata)){
        $request = json_decode($postdata);
        $firstName = $request->newsData->firstName;
        $lastName = $request->newsData->lastName;
        $subject = $request->newsData->subject;
        $description = $request->newsData->description;
        $author_name = $firstName." ".$lastName;
        $user_id = $request->user_ID;
        
        $image_parts = explode(";base64,", $request->image);      
        $image_type_aux = explode("image/", $image_parts[0]); 
        $image_base64 = base64_decode($image_parts[1]);      
        $file = $folderPath . uniqid() . '.png';
        // echo $image_base64;
        // die;      
        if(file_put_contents($file, $image_base64)){  
            // Save the image path to the database
            $sql = "INSERT INTO articles (title, description, author_name, date, flag, user_id, image) VALUES ('$subject', '$description', '$author_name', '$date', 1, '$user_id', '$file')";
         
            if ($con->query($sql) === TRUE) {
                echo json_encode(array('status'=>true,'msg'=>'upload image'));
            }else{
                echo json_encode(array('status'=>false,'msg'=>'Failed to upload image'));
            }
       }else {
        $error = error_get_last();
        echo json_encode(array('status'=>false,'msg'=>'Failed to write file: ' . $error['message']));
    }
    }
} else {
    echo json_encode(['message' => 'This endpoint only accepts POST requests']);
}
?>