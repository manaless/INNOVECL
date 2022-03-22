<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Request-Method: GET");
header("Access-Control-Request-Method: POST");
header("Access-Control-Request-Method: *");
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "innov_ecl";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
$conn->query('SET NAMES utf8');
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

    $data = $_POST;
    $id=$_POST['id'];
    
    $sql = "DELETE FROM idée WHERE id_idée ='{$id}'";
    if (mysqli_query($conn,$sql)) {
    $data = array("data" => "Element deleted successfully");
        print json_encode($data);
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }


?>
