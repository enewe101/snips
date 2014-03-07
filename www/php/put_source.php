<?php

### Did you remember to turn validation back on?

	require_once $_SERVER['DOCUMENT_ROOT'] . '/common/php/db.php'; 
	$TABLE_NAME = 'sources';
	$DB_NAME = 'uedwardn_clips';

	# Get a connection to the database
	$conn = connect_db($DB_NAME);

	# These are the variables expected via POST
	$posted_var_names = array('title', 'authors', 'pub_date', 
		'pub_name', 'vol', 'issue', 'start_page', 'end_page', 'bib_code');

	# Get the POST variables
	$posted_vars = get_vars_json($posted_var_names, TRUE);

	# Validation
	$validations = array(
		'title' => array(
			'type' => 'string'
			, 'required' => TRUE
		)
		, 'authors' => 'array'
		, 'pub_date' => 'integer'
		, 'pub_name' => 'string'
		, 'vol' => 'string'
		, 'issue' => 'string'
		, 'start_page' => 'integer'
		, 'end_page' => 'integer'
		, 'bib_code' => 'string'
	);

//>>	validate($posted_vars, $validations, 'put_source POST variables' );

	// Start aggregating the values that will be inserted into the db
	$insert_vars = array();
	foreach($posted_vars as $key => $val) {
		$insert_vars[$key] = $val;
	}

	# Pick out the first and last name of the first author.  It's used for
	# making the bib_code and naming the .pdf
	$first_author = $posted_vars['authors'][0];
	$last_name = $first_author[0];
   	$first_name = $first_author[1];

	echo var_dump($first_author);

	# If the user hasn't set the bib_code, make one from author names and year
	if(missing('bib_code')) {
		$bib_code = $posted_vars['pub_date'] . $last_name;
		$bib_code .= time() % 100;
		$insert_vars['bib_code'] = $bib_code;
	} 

	# Validation -- Make sure that the bib_code is unique #
	$sql =  get_sql_select_query($conn, $TABLE_NAME, 
		array('bib_code' => $bib_code));
	$result = mysqli_query($conn, $sql);
	if($err = mysqli_error($conn)) {
		echo '{"success":false, "error":"'.$err.'", "sql":"'.$sql.'"}';
		exit(1);
	} 
	if(mysqli_num_rows($result)) {
		echo '{"success":false, "error":"Ref codes must be unique; '
			.  $bib_code . ' exists already.", "sql":"'.$sql.'"}';
		exit(2);
	}

	# Check for a file upload, if so save it. Mark the path in the database
	if(is_uploaded_file($_FILES['pdf']['tmp_name'])) {
		$dest_name = $_SERVER['DOCUMENT_ROOT'] . '/snips/pdfs/';
		$first_author = $posted_vars['authors'][0];
		$dest_name .= $first_author[0] . '.' . $first_author[1];
		$dest_name .= '.' . $posted_vars['pub_date'];

		$dest_extension = 'pdf';
		$path = put_file('pdf', $dest_name, $dest_extension, TRUE);
		if(!$path) {
			echo '{"success":false, "error":"There was a problem uploading '
				.  'the file."}';
			exit(3);
		}
		$path = explode('/', $path);

		$insert_vars['path'] = array_pop($path);
	}

	# Make an sql insert statement
	$sql = get_sql_insert_query($conn, $TABLE_NAME, $insert_vars);
	$sql .= ", create_date=NOW()";

	# Insert into the db
	$result = mysqli_query($conn, $sql);
	if($err = mysqli_error($conn)) {
		echo '{"success":false, "error":'.$err.', "sql":"'.$sql.'"}';
	} else {
		$insert_id = mysqli_insert_id($conn);
		echo '{"success":true, "error":null, "id":'.$insert_id.'}';
	}
?>


