<?php
	require_once $_SERVER['DOCUMENT_ROOT'] . '/common/php/db.php'; 
	$TABLE_NAME = 'sources';
	$DB_NAME = 'uedwardn_clips';

	# Get a connection to the database
	$conn = connect_db($DB_NAME);

	# These are the variables expected via POST
	$posted_var_names = array('id', 'bib_code');
	
	# Get the POST variables
	$posted_vars = get_vars($posted_var_names);
	
	# Make an sql insert statement
	$sql = get_sql_update_query($conn, $TABLE_NAME, $posted_vars, 'id');

	# Insert into the db
	$result = mysqli_query($conn, $sql);
	if($err = mysqli_error($conn)) {
		echo '{"success":false, "error":"'.$sql.'"}';
	} else {
		$insert_id = $posted_vars['id'];
		echo '{"success":true, "error":null, "id":'.$insert_id.'}';
	}

	
?>

