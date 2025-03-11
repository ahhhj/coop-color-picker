<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "test";

	// Create connection
	$conn = mysqli_connect($servername, $username, $password, $dbname);

	if (!$conn) {
		die("Connection failed: " . mysqli_connect_error());
	}

	$sql = "SELECT * FROM color WHERE id = 0";
	$result = mysqli_query($conn, $sql);
	$red;
	$green;
	$blue;
	$alpha;
	// Fetch the result data
	if (mysqli_num_rows($result) > 0) {
		$row = mysqli_fetch_assoc($result);
		$red=$row["red"];
		$green=$row["green"];
		$blue=$row["blue"];
		$alpha=$row["alpha"];
	}
	$array=array("red"=>$red,"green"=>$green,"blue"=>$blue,"alpha"=>$alpha);
	echo json_encode($array,JSON_NUMERIC_CHECK);
?>