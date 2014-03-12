<?php
	require_once '../../common/php/db.php'; 
	$TABLE_NAME = 'sources';
	$DB_NAME = 'uedwardn_clips';

	# Get a connection to the database
	$conn = connect_db($DB_NAME);

	# These are the variables expected via POST
	$posted_var_names = array('id');
	
	# Get the POST variables
	$posted_vars = get_vars($posted_var_names);
	
	# Make an sql insert statement
	$sql = get_sql_select_query($conn, $TABLE_NAME, $posted_vars);

	# Query the db
	$result = mysqli_query($conn, $sql);
	if($err = mysqli_error($conn)) {
		echo '{"success":false, "error":"'.$sql.'"}';
	} else {
		echo result2json($result);
	}

?>

