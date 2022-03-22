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
    $sql = "INSERT INTO note (id_seance,id_critere, id_idee, note)
        VALUES ('".$data['id_seance']."' ,'".$data['id_critere']."' , '".$data['id_idee']."' ,'".$data['note']."')";
    if (mysqli_query($conn,$sql)) {
    $data = array("data" => "Your data added successfully");
        print json_encode($data);
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
 ?>