<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require "database.php";

// SQL query to select all users
$sql = "SELECT * FROM users";

// Execute the query
$result = mysqli_query($con, $sql);


// Check if the query was successful
if ($result) {
    // Check if there are any results
    if (mysqli_num_rows($result) > 0) {
        // Array to hold the fetched data
        $users = array();

        // Fetch each row from the result set
        while ($row = mysqli_fetch_assoc($result)) {
            // Add each user to the users array
            $users[] = $row;
        }

        // Return the users data as JSON
        echo json_encode($users);
    } else {
        // If no users found, return an empty array as JSON
        echo json_encode(array());
    }
} else {
    // If the query failed, return an error message
    echo json_encode(array("error" => "Failed to fetch users."));
}

// Close the database connection
mysqli_close($con);
