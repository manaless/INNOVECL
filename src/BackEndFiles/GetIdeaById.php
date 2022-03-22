<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Request-Method: GET");
header("Access-Control-Request-Method: *");
$servername = "localhost";
$database = "innov_ecl";
$username = "root";
$password = "";

// Create connection

$conn = mysqli_connect($servername, $username, $password, $database);
$conn->query('SET NAMES utf8');

// Check connection

if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}

$data = $_POST;

$trp =  mysqli_query($conn, "SELECT id_idée,enonce_idee from idée WHERE id_idée=".$data["id"]."");
        $r = mysqli_fetch_assoc($trp);
        echo json_encode($r);



mysqli_close($conn);

?>