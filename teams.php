<?php
//Set variabloes and locations for the connection.
$hostname = "localhost";
$user = "bentouss_testing";
$pass = "b3ntoussi";
$database = "bentouss_testing";
//connection string and die if fails
mysql_connect("$hostname", "$user", "$pass") or die(mysql_error());
mysql_select_db("$database") or die(mysql_error());

$sql = "select * from teamList";

$result = mysql_query($sql);
$json = array();
if (mysql_num_rows ($result)) {
	while ($row = mysql_fetch_assoc($result)) {
		$json[] = array('name' => $row['name'], 'founded' => $row['founded'], 'city' => $row['city'], 'stadium' => $row['stadium'], 'capacity' => $row['capacity'], 'manager' => $row['manager'], 'websiteLink' => $row['websiteLink']);
	}
}
echo json_encode($json);
?>