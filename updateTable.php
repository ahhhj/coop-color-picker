<?php
	//uses get request 
	header("Content-type: text/plain");
	$id = $_GET["id"];
	$red = $_GET["red"];
	$green = $_GET["green"];
	$blue = $_GET["blue"];
	$alpha = $_GET["alpha"];

	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "test";

	$conn = mysqli_connect($servername, $username, $password, $dbname);
	if (!$conn) {
		die("Connection failed: " . mysqli_connect_error());
	}

	$sql =
	"UPDATE color
	SET red = $red, green = $green, blue = $blue, alpha=$alpha
	WHERE id = $id;
	";
	$result = mysqli_query($conn, $sql);
	mysqli_close($conn);
?>