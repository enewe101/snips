<?php

require_once '../../common/php/db.php'; 
$conn = connect_db('uedwardn_clips');

$refs = file_get_contents('refs.txt');
$refs = explode("\n", $refs);
foreach($refs as $fname) {
	$name = explode('.',$fname);
	$name = $name[0];
	$name_date = explode(' ', $name);
	$date = substr($name_date[1],0,4);
	$auth = $name_date[0];

	$sql = "INSERT INTO sources SET";
	$sql .= " doc_name='$name'";
	$sql .= ", authors='$auth'";
	$sql .= ", create_date=NOW()";
	$sql .= ", display_name='$name'";
	$sql .= ", path='$fname'";

	$result = mysqli_query($conn, $sql);
	if($err = mysqli_error($conn)) {
		echo $err;
	} else {
		echo '---';
	}
}

?>
