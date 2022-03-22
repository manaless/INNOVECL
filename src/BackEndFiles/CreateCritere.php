<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Request-Method: POST");
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
    $sql = "INSERT INTO criteres (enonce_critere)
        VALUES ('".$data['enonce_critere']."')";
    if (mysqli_query($conn,$sql)) {
    $data = array("data" => "Your data added successfully");
        print json_encode($data);
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
 ?>
