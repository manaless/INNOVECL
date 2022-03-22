<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Request-Method: POST");
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
    $sql = "INSERT INTO seance (sujet_seance)
        VALUES ('".$data['sujet_seance']."')";
    if (mysqli_query($conn,$sql)) {
        $last_id = $conn->insert_id;
        $trp =  mysqli_query($conn, "SELECT * FROM seance WHERE id_seance=".$last_id."");
        $r = mysqli_fetch_assoc($trp);
        echo json_encode($r);
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
 ?>
