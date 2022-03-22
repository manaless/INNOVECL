<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Request-Method: POST");
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


$data=$_POST;
$trp = mysqli_query($conn, "SELECT * from note WHERE id_seance=".$data['id']." ORDER BY id_idee ASC");
$rows = array();

while($r = mysqli_fetch_assoc($trp)) 
{
   $rows[] = $r;
}



echo json_encode($rows);



mysqli_close($conn);

?>