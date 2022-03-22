<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Request-Method: POST");
header("Access-Control-Request-Method: *");
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "innov_ecl";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = $_POST;
    $sql = "UPDATE allIdeas SET score='".$data['score']."' WHERE id_idee='".$data['id']."'";
    if (mysqli_query($conn,$sql)) {
    $data = array("data" => "Your data updated successfully");
        print json_encode($data);
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
 ?>
