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
	$json = file_get_contents('php://input');
	$result = json_decode($json, true);
	foreach($result as $value) { 
		mysql_query("INSERT INTO teamList (name, founded, city, stadium, capacity, manager, websiteLink) 
		VALUES ('".$value['name']."', '".$value['founded']."', '".$value['city']."', '".$value['stadium']."', '".$value['capacity']."', '".$value['manager']."', '".$value['websiteLink']."')");
}
	// if ($params){
	// 		json_decode($params);
	// 		$name = $_POST['name'];
	// 		$founded = $_POST['founded'];
	// 		$city = $_POST['city'];
	// 		$stadium = $_POST['stadium'];
	// 		$capacity = $_POST['capacity'];
	// 		$manager = $_POST['manager'];
	// 		$websiteLink = $_POST['websiteLink'];
	// 		$image = $_POST['image'];
	// 		$details = $_POST['details'];
		
	// 	$sql = "INSERT into teamList ('name', 'founded', 'city', 'stadium', 'capacity', 'manager', 'websiteLink', 'image', 'details') VALUES ('$name', '$founded', '$city', '$stadium', '$capacity', '$manager', '$websiteLink', '$image', '$details')";
	// 	$result = mysql_query($sql);
	// 	echo $result;
	// }
	break;

}
