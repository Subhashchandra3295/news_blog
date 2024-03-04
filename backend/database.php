<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    
    $db_host = 'localhost';
    $db_username = 'root';
    $db_password = '';
    $db_name = 'news';
    $con = new mysqli($db_host, $db_username, $db_password, $db_name);

    if ($con->connect_error) {
        die('Error : ('. $con->connect_errno .') '. $con->connect_error);
    }