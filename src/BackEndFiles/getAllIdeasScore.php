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

$trp = mysqli_query($conn, "SELECT * from allIdeas ORDER BY score DESC");
$rows = array();

while($r = mysqli_fetch_assoc($trp)) 
{
   $rows[] = $r;
}




echo json_encode($rows);

/*function console_log( $data ){
    echo 'console.log('. json_encode( $data ) .')';
    
}
console_log( $rows[0]);*/
?>
