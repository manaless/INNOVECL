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


$trp = mysqli_query($conn, "SELECT * from question");      

    
$rows = array();

while($r = mysqli_fetch_assoc($trp)) 
{
   $rows[] = $r;
}

echo json_encode($rows);

/* $sql = "SELECT * from question";
    $result = mysqli_query($conn, $sql) or die("Error in Selecting " . mysqli_error($conn));

    //create an array
    $questions = [];

    while($row =mysqli_fetch_assoc($result))
    {
        $r = new stdClass();
        $r->id_question = $row['id_question'];
        $r->enonce_question = $row['enonce_question'];
        $r->categorie = $row['categorie'];
        array_push($questions,$r);
        
    }
    echo json_encode($questions);

    //close the db connection
    mysqli_close($conn); */

/*function console_log( $data ){
    echo 'console.log('. json_encode( $data ) .')';
    
}
console_log( $rows[0]); */
?>
