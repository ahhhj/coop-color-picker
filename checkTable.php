<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully <br>";

// Run a SQL query
//put things in the list
// $sql = "INSERT INTO color (id, red, green, blue, alpha) VALUES (2,255,255,50,255)";
// $sql = "INSERT INTO color (id, red, green, blue, alpha) VALUES (3,255,127,50,255)";
// $sql = "INSERT INTO color (id, red, green, blue, alpha) VALUES (4,0,255,150,255)";
// $sql = "INSERT INTO color (id, red, green, blue, alpha) VALUES (5,0,0,255,200)";
// mysqli_query($conn, $sql);

$sql = "SELECT * FROM color";
$result = mysqli_query($conn, $sql);

// Fetch the result data
if (mysqli_num_rows($result) > 0) {
	echo "
		<table>
		<tr>
			<th>id |</th>
			<th>red |</th>
			<th>green |</th>
			<th>blue |</th>
			<th>alpha</th>
			<th>color:</th>
		</tr>
	";
    while($row = mysqli_fetch_assoc($result)) {
		$r=$row["red"];
		$g=$row["green"];
		$b=$row["blue"];
		$a=$row["alpha"];
		echo "
		<tr>
			<td>".$row["id"]."</td>
			<td>".$r."</td>
			<td>".$g."</td>
			<td>".$b."</td>
			<td>".$a."</td>
			<td>
				<div style=\"
					width:40px;
					height:20px;
					background-color:rgba(".$r.",".$g.",".$b.",".($a/255).");
					\">
				</div>
			</td>
		</tr>
		";
    }
	echo"</table>";
} else {
    echo "0 results... adding one. Refresh the page to see it";
	$sql = "INSERT INTO color (id, red, green, blue, alpha) VALUES (0,255,50,50,128)";
	mysqli_query($conn, $sql);
}

// Close the connection
mysqli_close($conn);
?>