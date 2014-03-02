<?php
	require_once $_SERVER['DOCUMENT_ROOT'] . '/common/php/db.php'; 
	$TABLE_NAME = 'sources';
	$DB_NAME = 'uedwardn_clips';

	# Get a connection to the database
	$conn = connect_db($DB_NAME);

	# These are the variables expected via POST
	$posted_var_names = array('id', 'bib_code', 'doc_name', 'authors',
		'create_date', 'modify_date');

	# Get the POST variables
	$omit_absent = TRUE;
	$posted_vars = get_vars($posted_var_names, $omit_absent);
	

	# Make an sql insert statement
	$sql = get_sql_select_query($conn, $TABLE_NAME, $posted_vars);


	# Query the db
	$result = mysqli_query($conn, $sql);
	if($err = mysqli_error($conn)) {
		echo '{"success":false, "error":"'.$sql.'"}';
	} else {
		echo result2json($result);
	}


//	$link_prefix = 'http://shpow.com/snips/snipper.php?source_id=';
//	while($row = mysqli_fetch_assoc($result)) {
//		$name = $row['display_name'];
//		$id = $row['id'];
//		echo "<a href='$link_prefix$id'>$name</a><br />";
//	}
?>

