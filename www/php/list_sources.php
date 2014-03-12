<?php
	require_once '../../common/php/db.php'; 
	$TABLE_NAME = 'sources';
	$DB_NAME = 'uedwardn_clips';

	# Get a connection to the database
	$conn = connect_db($DB_NAME);

	# These are the variables expected via POST
//	$posted_var_names = array('id');
	
	# Get the POST variables
//	$posted_vars = get_vars($posted_var_names);
	
	# Make an sql insert statement
//	$sql = get_sql_select_query($conn, $TABLE_NAME, $posted_vars);

	$sql = "SELECT * FROM sources";

	# Query the db
	$result = mysqli_query($conn, $sql);
	if($err = mysqli_error($conn)) {
		echo '{"success":false, "error":"'.$sql.'"}';
		exit(1);
	} else {

?>
<html>
	<head>
		<script type='text/javascript' src='../../common/js/jquery.js'>
		</script>
		<script type='text/javascript' src='js/pdf.js'></script>
		<script type='text/javascript' src='js/app_lib.js'></script>
		<script type='text/javascript'>
			var source_id = <?php echo $source_id; ?>;
		</script>
		<script type='text/javascript' src='js/add_snip_control.js'></script>
		<script type='text/javascript' src='js/add_snip_view.js'></script>
		<link rel='stylesheet' type='text/css' href='css/main.css' />
		<link rel='stylesheet' type='text/css' href='../../common/css/basic.css' />
	</head>

	<body>
<?php
	$link_prefix = 'http://shpow.com/snips/snipper.php?source_id=';
	while($row = mysqli_fetch_assoc($result)) {
		$name = $row['display_name'];
		$id = $row['id'];
		echo "<a href='$link_prefix$id'>$name</a><br />";
	}
?>
	</body>
<?php } ?>
