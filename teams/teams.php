<?php
//Set variabloes and locations for the connection.
$hostname = "localhost";
$user = "bentouss_testing";
$pass = "b3ntoussi";
$database = "bentouss_testing";
//connection string and die if fails
mysql_connect("$hostname", "$user", "$pass") or die(mysql_error());
mysql_select_db("$database") or die(mysql_error());


switch($_GET["action"]){
	case "list":
		$sql = "SELECT * FROM teamList";
		$result = mysql_query($sql);
		if (mysql_num_rows ($result)) {
		while ($row = mysql_fetch_assoc($result)) {
			$json[] = array('id' => $row['id'], 'name' => $row['name'], 'founded' => $row['founded'], 'city' => $row['city'], 'stadium' => $row['stadium'], 'capacity' => $row['capacity'], 'manager' => $row['manager'], 'websiteLink' => $row['websiteLink']);
			}
		}	
		echo json_encode($json);
	break;

	case "detail":
		if (isset($_GET['id'])) {
			$id = $_GET['id'];
			}
			$sql = "SELECT * FROM teamList WHERE id = '$id'";
			$result = mysql_query($sql);
			if (mysql_num_rows ($result)) {
				if ($row = mysql_fetch_assoc($result)) {
					$json = array('id' => $row['id'], 'name' => $row['name'], 'founded' => $row['founded'], 'city' => $row['city'], 'stadium' => $row['stadium'], 'capacity' => $row['capacity'], 'manager' => $row['manager'], 'websiteLink' => $row['websiteLink']);
					}
			}	
			echo json_encode($json);
	break;

	case "add":
		if (isset($_POST['add'])){
			$name = $_POST['name'];
			$founded = $_POST['founded'];
			$city = $_POST['city'];
			$stadium = $_POST['stadium'];
			$capacity = $_POST['capacity'];
			$manager = $_POST['manager'];
			$websiteLink = $_POST['websiteLink'];
			$image = $_POST['image'];
			$details = $_POST['details'];
		
		$sql = "INSERT into teamList ('name', 'founded', 'city', 'stadium', 'capacity', 'manager', 'websiteLink', 'image', 'details') VALUES ('$name', '$founded', '$city', '$stadium', '$capacity', '$manager', '$websiteLink', '$image', '$details')";
		$result = mysql_query($sql);
	}
	break;

}
