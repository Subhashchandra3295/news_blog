<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require "database.php";

// SQL query to select all articles
$sql = "SELECT * FROM articles";

// Execute the query
$result = mysqli_query($con, $sql);

// Check if the query was successful
if ($result) {
    // Check if there are any results
    if (mysqli_num_rows($result) > 0) {
        // Array to hold the fetched data
        $articles = array();

        // Fetch each row from the result set
        while ($row = mysqli_fetch_assoc($result)) {
            // Add each article to the articles array
            $articles[] = $row;
        }

        // Return the articles data as JSON
        echo json_encode($articles);
    } else {
        // If no articles found, return an empty array as JSON
        echo json_encode(array());
    }
} else {
    // If the query failed, return an error message
    echo json_encode(array("error" => "Failed to fetch articles."));
}

// Close the database connection
mysqli_close($con);
?>
