<?php
//MYSQLI sting to connect to the database
$mysqli = mysqli_connect("localhost", "bentouss_testing", "b3ntoussi", "bentouss_testing");

switch($_GET["action"]){
	// Switch case for the team list controller
	case "list":
		$query = "SELECT * FROM newteamList";
		$result = $mysqli->query($query);
		while ($row = $result->fetch_assoc()) {
			$json[] = array('id' => $row['id'], 'name' => $row['name'], 'founded' => $row['founded'], 'city' => $row['city'], 'stadium' => $row['stadium'], 'capacity' => $row['capacity'], 'manager' => $row['manager'], 'websiteLink' => $row['websiteLink'], 'image' => $row['image'], 'details' => $row['details']);
		}
		echo json_encode($json);
		$mysqli->close();
	break;
	// Switch case for the team details controller
	case "detail":
	 	$id = $_GET['id'];
		$query = $mysqli->prepare('SELECT * FROM newteamList WHERE id = ?');
		$query->bind_param('i', $id);
		$query->execute();
		$result = $query->get_result();
		while ($row = $result->fetch_assoc()){
		 	$json = array('id' => $row['id'], 'name' => $row['name'], 'founded' => $row['founded'], 'city' => $row['city'], 'stadium' => $row['stadium'], 'capacity' => $row['capacity'], 'manager' => $row['manager'], 'websiteLink' => $row['websiteLink'], 'image' => $row['image'], 'details' => $row['details']);
		 }
		 echo json_encode($json);
		 $mysqli->close();
	break;
	// Switch case for the add team controller
	case "add":
		$dataString = $_POST['image'];
		define('UPLOAD_DIR', '../badges/');
		$img = $dataString;
		if (preg_match('/png/', $dataString)){
			$img = str_replace('data:image/png;base64,', '', $img);
			$file = UPLOAD_DIR . uniqid() . '.png';
		} else if (preg_match('/jpeg/', $dataString)) {
			$img = str_replace('data:image/jpeg;base64,', '', $img);
			$file = UPLOAD_DIR . uniqid() . '.jpg';
		}

		$img = str_replace(' ', '+', $img);
		$data = base64_decode($img);
		$success = file_put_contents($file, $data);

		$query = $mysqli->prepare('INSERT INTO newteamList (name, founded, city, stadium, capacity, manager, websiteLink, image, details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
		$query->bind_param('sssssssss', $_POST['name'], $_POST['founded'], $_POST['city'], $_POST['stadium'], $_POST['capacity'], $_POST['manager'], $_POST['websiteLink'], $file, $_POST['details']);
		$query->execute();
		$mysqli->close();
	break;



	case "edit":
		$id = $_GET['id'];
		$dataString = $_POST['image'];

		if (stripos($dataString, 'base64') !== false){
			define('UPLOAD_DIR', '../badges/');
			$img = $dataString;
			if (preg_match('/png/', $dataString)){
				$img = str_replace('data:image/png;base64,', '', $img);
				$file = UPLOAD_DIR . uniqid() . '.png';
			} else if (preg_match('/jpeg/', $dataString)) {
				$img = str_replace('data:image/jpeg;base64,', '', $img);
				$file = UPLOAD_DIR . uniqid() . '.jpg';
			}
			$img = str_replace(' ', '+', $img);
			$data = base64_decode($img);
			$success = file_put_contents($file, $data);
		} else {
			$file = $_POST['image'];
		}
		


		//echo "the id is: ".$id." and there you go";

		$query = $mysqli->prepare('UPDATE newteamList SET name = ?, founded = ?, city = ?, stadium = ?, capacity = ?, manager = ?, websiteLink = ?, image = ?, details = ? WHERE id = ?');
		$query->bind_param('sssssssssi', $_POST['name'], $_POST['founded'], $_POST['city'], $_POST['stadium'], $_POST['capacity'], $_POST['manager'], $_POST['websiteLink'], $file, $_POST['details'], $id);
		$query->execute();
		$mysqli->close();
	break;











}
?>