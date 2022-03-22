<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Request-Method: POST");
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "innov_ecl";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);$conn->query('SET NAMES utf8');
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = $_POST;
    $sql = "INSERT INTO idée (id_seance,enonce_idee , id_question,  tags)
        VALUES ('".$data['id_seance']."' ,'".$data['enonce_idee']."' , ".$data['id_question'].", '".$data['tags']."')";
    if (mysqli_query($conn,$sql)) {
    
        echo json_encode(mysqli_insert_id($conn));
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
 ?>