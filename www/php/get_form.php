<?php
require_once '../../common/php/db.php'; 

$ALLOWED_TABLES = array('clips');
$DB_NAME = 'uedwardn_clips';

$table_name = get_var('table_name');
if(!is_string($table_name)) {
	exit(1);
} else if(!in_array($table_name, $ALLOWED_TABLES, $strict=TRUE)) {
	exit(2);
}

$conn = connect_db($DB_NAME);
$sql = "DESCRIBE $table_name;";
$result = mysqli_query($conn, $sql);
$form_def = array();
while($col = mysqli_fetch_assoc($result)) {
	$field_def = array();
	$field_def['name'] = $col['Field'];
	$field_def['type'] = parse_mysql_col_type($col['Type']);
	$field_def['required'] = $col['Null']=='NO'? TRUE : FALSE;
	$field_def['default'] = $col['Default'];
	$form_def[] = $field_def;
}

echo php2json($form_def);
?>
