<?php

	// Gloabals
	$HOST = '67.212.91.121';
	$USER = 'uedwardn_root';
	$PWD = 'integr8';

	$STRING_TYPES = array(
		'char', 
		'enum', 
		'varchar', 
		'tinytext', 
		'text', 
		'mediumtext', 
		'longtext', 
		'timestamp'
	);

	$NUMERIC_TYPES = array(
		'integer', 
		'int', 
		'smallint', 
		'tinyint', 
		'mediumint', 
		'bigint'
	);

	$VALID_TYPES = array(
		"boolean", 
		"integer", 
		"double", 
		"string", 
		"array", 
		"object", 
		"resource", 
		"NULL", 
		"unknown type"
	);


	function missing($var_name) {
		if(blank($var_name) || !received($var_name)) {
			return TRUE;
		}
		return FALSE;
	}
	
	function blank($var_name) {
		if($_GET[$var_name] == '' || $_POST[$var_name]=='') {
			return TRUE;
		} 
		return FALSE;
	}

	function received($var_name) {
		if(isset($_GET[$var_name]) || $isset($_POST[$var_name])) {
			return TRUE;
		}
		return FALSE;
	}

	/////// Puts an uploaded file 
	//
	//	# Params #
	// 
	//	# Return #
	//
	function put_file($key, $path_prefix, $path_suffix, $add_salt=TRUE) {

		// Handle file errors
		if($_FILES[$key]['error']) {
			//echo $_FILES[$key]['error'] . 'c';
			return false;
		}

		// Sample a string based on system time
		$salt = '';
		if($add_salt) {
			$salt = substr(sha1(time() . $key . $_FILES[$key]['name']), 0, 4);
		}

		$put_path = $path_prefix . '.' . $salt . '.' . $path_suffix;

		// Validation
		if(!$put_path) {
			throw new Exception('In put_file(): the path to which the file '
				. 'should be saved cannot be the empty string (empty string '
				. 'found');
		}

		move_uploaded_file($_FILES[$key]['tmp_name'], $put_path);

		return $put_path;
	}

	/////// Validates variables in batch, for example, GET or POST variables
	//
	//	# Params #
	//		$assoc_vars <assoc <mixed>>: 
	//			An array of variables to be tested
	//			where the keys are the variable names, and the values are to
	//			be tested.
	//		
	//		$assoc_specs <assoc (<spec>|<string>)>
	//			An array of specifications 
	//			that values in $assoc_vars should be tested against. 
	//
	//			<spec> := {
	//				"type": <type>
	//				, "high": <number>
	//				, "low": <number>
	//				, "values": <array <mixed>>
	//
	//			<type> := ("boolean" | "integer" | "double" | "string" 
	//				| "array" | "object" | "resource" | "NULL" |"unknown type")
	//
	//	# Return #
	//		<mixed> 
	//			Normally if the tests pass, the variable is returned, and
	//			if it fails, an exception is raised.  However...
	//
	//		<true> | <false> | NULL: If the 
	//			If 
	//			
	function validate($assoc_vars, $assoc_specs, $method_name='', 
		$just_test=FALSE) {
		foreach($assoc_vars as $key => $value) {

			$spec = $assoc_specs[$key];

			if(is_string($spec)) {
				if(not_legal($spec)) {
					throw new Exception("In $method_name: Got bad type "
						. "specification: <$spec> is not a recognized type "
						. "for variable $key.");
				}
				
				if(gettype($value) != $spec && !is_null($value)) {
					if($just_test) {
						return $spec == "boolean"? NULL : FALSE;
					}
					throw new Exception("In $method_name: expected $key to be "
						. '<' . $spec . '> but found <' 
						. gettype($value) . '>: ' . $value);
				}

			} else if(is_assoc($spec)) {
				$type_name = $spec['type'];

				if(not_legal($type_name)) {
					throw new Exception("In $method_name: Got bad type "
						. "specification: <$type_name> is not a recognized "
						. "type for variable $key.");
				}

				if(gettype($value) != $spec['type'] && ($spec['required'] || 
					!is_null($value))) {
					if($just_test) {
						return $spec == "boolean"? NULL : FALSE;
					}
					throw new Exception("In $method_name: expected $key to be "
						. '<' . $spec['type'] . '> but found <' 
						. gettype($value) . '>: ' . $value);
				}

				if(isset($spec['min']) && $value < $spec['min']) {
					if($just_test) {
						return "low";
					}
					throw new Exception("In $method_name: Minimum value for $key "
						. "is $spec[min], but found $value");
				}

				if(isset($spec['max']) && $value > $spec['max']) {
					if($just_test) {
						return "high";
					}
					throw new Exception("In $method_name: Maximum value for $key "
						. "is $spec[max], but found $value");
				}

				if(isset($spec['values']) && 
					array_search($value, $spec['values'], TRUE)) {
					if($just_test) {
						return "bad";
					}
					throw new Exception("In $method_name: The value for $key "
						. "was $value. Expected one of the following: "
						. $implode(', ', $spec['values']));
				}
			}
		}
	}

	function not_legal($type_name) {
		global $VALID_TYPES;
		if(in_array($type_name, $VALID_TYPES)) {
			return FALSE;
		}
		return TRUE;
	}

	/////// Validates variables in batch, for example, GET or POST variables
	//
	//	# Params #
	//		$assoc_vars <assoc <mixed>>: 
	//			An array of variables to be tested
	//			where the keys are the variable names, and the values are to
	//			be tested.
	//		
	//		$assoc_specs <assoc (<spec>|<string>)>
	//			An array of specifications 
	//			that values in $assoc_vars should be tested against. 
	//
	//			<spec> := {
	//				"type": <type>
	//				, "high": <number>
	//				, "low": <number>
	//				, "values": <array <mixed>>
	//
	//			<type> := ("boolean" | "integer" | "double" | "string" 
	//				| "array" | "object" | "resource" | "NULL" |"unknown type")
	//
	//	# Return #
	//
	//		TRUE | FALSE | NULL | "low" | "high" | "bad"
	//			If the all the tests pass, TRUE is returned.  If the variable
	//			type is wrong, then FALSE is returned, unless <boolean> was
	//			expected, in which case NULL is returned.
	//		
	//			If the min or max fail, then "low" or "high" is returned.  If
	//			allowed values isset, "bad" is returned for invalid values.
	//			
	function check($assoc_vars, $assoc_specs, $methodname='') {
		validate($assoc_vars, $assoc_specs, $method_name, TRUE);
	}
			

	/////// Opens a connection to the database server
	//
	//	# Params #
	//		$db_name: string. The name of the database to which to connect.
	//
	//	# Return #
	// 		A database connection object.
	//
	function connect_db($db_name) {
		$con = mysqli_connect($GLOBALS['HOST'], $GLOBALS['USER'], 
			$GLOBALS['PWD'], $db_name);
		if(mysqli_connect_errno($con)) {
			echo 'Failed to connect to MySql';
		}
		return $con;
	}


	// DEPRECATED
	/////// Opens a connection to the database server, and chooses the 
	//	signalling database.
	//
	//	# Params # 
	//
	//	# Return #
	// 		A database connection object.
	//
	function db_connect() {
		$con = mysqli_connect($GLOBALS['HOST'], $GLOBALS['USER'], 
			$GLOBALS['PWD'], 'uedwardn_signal');
		if(mysqli_connect_errno($con)) {
			echo 'Failed to connect to MySql';
		}
		return $con;
	}

	
	/////// Gets many json-encoded variables from $_GET or $_POST 
	//
	//	# Params #
	//		$var_names: an array of strings representing variables names
	//
	//	# Optional # 
	//		$omit_absent: skip variables not set in $_GET or $_POST. if 
	//			$omit_absent is FALSE for variables not set in $_GET / $_POST
	//
	//	# Return #
	//		mixed
	// 
	function get_vars_json($var_names, $omit_absent=FALSE) {
		$vars = array();
		foreach($var_names as $var_name) {

			// Check if the field was received 
			$received = (
				isset($_POST[$var_name]) 
				|| isset($_GET[$var_name])
			);

			// Check if field was blank (i.e empty string)
			$is_blank = (
				$_POST[$var_name] === '' 
				||  $_GET[$var_name] === ''
			);

			// Decide if the field is missing
			$missing = !$received || $is_blank;

			// Option to skip missing fields 
			// the default is to include them as NULL
			if($omit_absent && $missing) {
				continue;
			}

			echo "$var_name: $_POST[$var_name]";
			// Decode the JSON
			$obj = get_var_json($var_name);

			// Option to skip missing fields
			// Anything that decodes to empty string is also considered blank
			if($obj == '') {
				continue;
			}

			
			if($var_name == 'authors') {
				echo '<br />AUTHORS: ';
				var_dump($obj);
			}
			$vars[$var_name] = $obj;
		}
		return $vars;
	}

	/////// Gets json-encoded data from either $_GET or $_POST, and parses
	//  into PHP data types.
	//
	//	# Params #
	//		$var_name: a string representing the name of variable
	//
	//	# Return #
	// 		Various return types. 
	//
	function get_var_json($var_name) {
		if(isset($_GET[$var_name])) {
			return json_decode($_GET[$var_name]);
		} 
		
		else if(isset($_POST[$var_name])) {
			return json_decode($_POST[$var_name]);
		}

		return NULL;
	}

	
	/////// Gets many variables from $_GET or $_POST 
	//
	//	# Params #
	//		$var_names: an array of strings representing variables names
	//
	//	# Optional # 
	//		$omit_absent: skip variables not set in $_GET nor in $_POST
	//
	//	# Return #
	//		an associative array of the variable names and found values
	// 
	function get_vars($var_names, $omit_absent=FALSE) {
		$vars = array();
		foreach($var_names as $var_name) {

			if($omit_absent 
				&& !isset($_POST[$var_name]) &&!isset($_GET[$var_name])) {
				continue;
			}

			$vars[$var_name] = get_var($var_name);
		}
		return $vars;
	}


	/////// Gets a variable from either $_GET or $_POST
	//
	//	# Params #
	//		$var_name: a string representing the name of variable
	//
	//	# Return #
	// 		Various return types. Comma-containing strings will be parsed into
	//		an array.  Numeric strings will be parsed into an integer.
	//
	function get_var($var_name) {
		if(isset($_GET[$var_name])) {
			return parse_var($_GET[$var_name]);
		} 
		
		else if(isset($_POST[$var_name])) {
			return parse_var($_POST[$var_name]);
		}

		return NULL;
	}



	/////// Parses variables into int or array.  Used to automatically 
	//		structure variables passed in url string (i.e. $_GET)
	//
	//	# Params #
	//		$val: Potentially mixed type, but generally a string.
	//
	//	# Return #
	// 		Various return types. Comma-containing strings will be parsed into
	//		an array.  Numeric strings will be parsed into an integer.
	//
	function parse_var($val) {
		if(is_numeric($val)) {
			return (int)$val;
		} 
		if(is_string($val)) {
			return $val;

//			$new_val = explode(',', $val);
//			if(count($new_val) > 1) {
//				return $new_val;
//			} else {
//				return $val;
//			}

		}
		return $val;
	}

	/////// Makes an SQL query string to select records from the indicated
	//	table, matching columns matching supplied values, with 
	//	optionally specifying the names of the columns to return.
	//
	//	# Params #
	//		$conn <database connection>
	//		$table_name <string>:  Name of the table to query.
	//		$vars <associative array <string>:<mixed> >:  Name of the table 
	//			to query.
	//
	//	# Return #
	// 		<string> An SQL query string.
	//
	function get_sql_select_query($conn, $table_name, $vars, $col_names=NULL) {
		if(is_null($col_names)) {
			$cols_expression = '*';
		} else {
			$cols_expression = '`' . implode('`,`',$col_names) . '`';
		}
		$sql = "SELECT $cols_expression FROM $table_name WHERE 1";

		$first = TRUE;
		foreach($vars as $col_name => $val) {
			$sql .= " AND `$col_name`=";
			$sql .=	enquote_and_mysql_escape($conn, $val);
		}
		return $sql;

	}


	/////// Makes an SQL query string to update records in the indicated
	//	table. 
	//
	//	# Params #
	//		$conn <database connection>
	//		$table_name <string>:  Name of the table to query.
	//		$vars <associative array <string>:<mixed> >: Keys indicate column
	//			names, and values indicate either the value to set, or to be
	//			matched in the WHERE clause.
	//		$where_var_names <array <string>>: Indicates which of the values
	//			in $vars should be treated as to-be-matched in WHERE clause
	//
	//	# Return #
	// 		<string> An SQL query string.
	//
	function get_sql_update_query($conn, $table_name, $vars, $where_var_name) {
		$sql = "UPDATE $table_name SET";
		$first = True;
		foreach($vars as $col_name => $val) {
			# There variable that is associated with the where clause is
			# handled after
			if($col_name == $where_var_name) {
				continue;
			}

			# Add a separator, but not for the first column!
			if($first) {
				$first = False;
			} else {
				$sql .= ',';
			}

			$sql .= " `$col_name`=" . enquote_and_mysql_escape($conn, $val);
		}
		$sql .= " WHERE `$where_var_name`=";
	   	$sql .=  enquote_and_mysql_escape($conn, $vars[$where_var_name]);
		return $sql;
	}

	

	/////// Makes an SQL insert query string.
	//
	//	# Params #
	//		$conn <database connection>
	//		$table_name <string>:  Name of the table to query.
	//		$vars <associative array <string>:<mixed> >: Keys indicate column
	//			names, and values indicate value to store
	//
	//	# Return #
	// 		<string> An SQL query string.
	//
	function get_sql_insert_query($conn, $table_name, $vars) {
		$sql = "INSERT INTO $table_name SET";
		$first = True;
		foreach($vars as $col_name => $val) {
			# Add a separator, but not for the first column!
			if($first) {
				$first = False;
			} else {
				$sql .= ',';
			}

			$sql .= " `$col_name`=" . enquote_and_mysql_escape($conn, $val);
		}
		return $sql;
	}

	function get_sql_delete_query($conn, $table_name, $vars) {
		$sql = "DELETE FROM $table_name WHERE";
		$first = True;
		foreach($vars as $col_name => $val) {
			# Add a separator, but not for the first column!
			if($first) {
				$first = False;
			} else {
				$sql .= ',';
			}

			$sql .= " `$col_name`=" . enquote_and_mysql_escape($conn, $val);
		}
		return $sql;
	}

	/////// Escape special characters for inclusion in SQL queries.  Enquote
	//	strings.
	//
	//	# Params #
	//		$conn <database connection>
	//		$val <mixed>
	//
	//	# Return #
	// 		<mixed> Value is safe to include in an SQL query
	//
	function enquote_and_mysql_escape($conn, $val) {
		$val = db_serialize($val);
		if(is_string($val)) {
			return "'" . mysqli_real_escape_string($conn, $val) . "'";
		}
		return $val;
	}


	/////// Serialize a database resultset into JSON, often for satisfying
	//	AJAX requests
	//
	//	# Params #
	//		$result <mysqli result set>: resultset from a SELECT query.
	//
	//	# Return #
	// 		<string> Valid JSON string representation of the database results.
	//
	function result2json($result) {
		$array_literal = '[';
		$row_sep = '';
		while($row = mysqli_fetch_assoc($result)) {
			$array_literal .= $row_sep . '{';
			$sep = '';
			foreach($row as $field_name => $value) {
				$array_literal .= "$sep \"$field_name\": ";
				if(is_numeric($value)) {
					$array_literal .= $value;
				} else if(is_string($value)) {
					$value = js_escape($value); // check this too
					$array_literal .= "\"$value\"";
				} else if(is_null($value)) {
					$array_literal .= "null";
				}
				$sep = ',';
			}
			$array_literal .= '}';
			$row_sep = ',';
		}
		$array_literal .= ']';
		return $array_literal;
	}


	/////// Removes special characters that need to be escaped for strings
	//	included in JSON.
	//
	//	# Params #
	//		$str <string>: String to escape.
	//
	//	# Return #
	// 		<string>: String that is safe to include in JSON.
	//
	function js_escape($str) {
		$str = addcslashes($str, '\\"');
		return preg_replace('/(\r)?\n/', '\n', $str);
	}


	function parse_mysql_col_type($val) {
		global $NUMERIC_TYPES, $STRING_TYPES;
		$type = explode('(', $val);
		$type = $type[0];
		if(in_array($type, $NUMERIC_TYPES)) {
			return 'number';
		} else if (in_array($type, $STRING_TYPES)) {
			return 'string';
		} else {
			return $type;
		}

	}

	function db_serialize($val) {

		# Strings don't need encoding
		if(is_string($val)) {
			return $val;

		# Booleans as tiny ints
		} else if(is_bool($val)) {
			return $val? 1 : 0;

		# Numbers dan't need encoding
		} else if(is_double($val) || is_int($val)) {
			return $val;

		# Arrays
		} else if(is_array($val)) {

			$str = json_encode($val); 

//			$first = True;
//
//			foreach($val as $element) {
//				if($first) {
//					$first = False;
//				} else {
//					$str .= ",";
//				}
//
//				$str .= db_serialize($element);
//			}

			return $str;
		}
	}

	function get_form($conn, $table_name) {
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

		return php2json($form_def);
	}

	function php2json($var) {
		if(is_int($var)) {
			return (string)$var;
		} else if(is_string($var)) {
			return '"' . js_escape($var) . '"';
		} else if(is_null($var)) {
			return 'null';
		} else if(is_bool($var)) {
			return $var? 'true' : 'false';
		} else if(is_assoc($var)) {
			$json = '{';
			$first = TRUE;
			foreach($var as $key=>$element) {
				if($first) {
					$first = FALSE;
				} else {
					$json .= ',';
				}
				$json .= '"' . js_escape($key) . '":' . php2json($element);
			}
			$json .= '}';
			return $json;
		} else if(is_array($var)) {
			$json = '[';
			$first = TRUE;
			foreach($var as $element) {
				if($first) {
					$first = FALSE;
				} else {
					$json .= ',';
				}
				$json .= php2json($element);
			}
			$json .= ']';
			return $json;
		}
	}

	function is_assoc($arr) {
		$found_str = FALSE;
		if(is_array($arr)) {
			foreach($arr as $key=>$val) {
				if(is_string($key)) {
					$found_str = TRUE;
				}
			}
			return $found_str;
		}
		return FALSE;
	}

	function filter_non_null($assoc_arr) {
		$return_arr = array();
		foreach($assoc_arr as $key => $val) {
			if(!is_null($val)) {
				$return_arr[$key] = $val;
			}
		}

		return $return_arr;
	}



?>
