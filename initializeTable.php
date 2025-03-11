<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "test";
	$conn = mysqli_connect($servername, $username, $password, $dbname);
	if (!$conn) {
		die("Connection failed: " . mysqli_connect_error());
	}else{
		echo("successfully connected.\n");
	}
	
	$sql = 
	"INSERT INTO color 
	(id, red, green, blue, alpha)
	VALUES (0,127,127,127,255)";
	$result = mysqli_query($conn, $sql);
	mysqli_close($conn);
	echo("reached end of code. you can close this now.\n");
?>