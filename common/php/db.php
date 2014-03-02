<?php

	$host = '67.212.91.121';
	$user = 'uedwardn_test';
	$pwd = '';


	/////// Opens a connection to the database server
	//
	//	# Params #
	//		$db_name: string. The name of the database to which to connect.
	//
	//	# Return #
	// 		A database connection object.
	//
	function connect_db($db_name) {
		$con = mysqli_connect($GLOBALS['host'], $GLOBALS['user'], 
			$GLOBALS['pwd'], $db_name);
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
		$con = mysqli_connect($GLOBALS['host'], $GLOBALS['user'], 
			$GLOBALS['pwd'], 'uedwardn_signal');
		if(mysqli_connect_errno($con)) {
			echo 'Failed to connect to MySql';
		}
		return $con;
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
			$new_val = explode(',', $val);
			if(count($new_val) > 1) {
				return $new_val;
			} else {
				return $val;
			}
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

	$string_types = array('char', 'enum', 'varchar', 'tinytext', 'text', 
		'mediumtext', 'longtext', 'timestamp');
	$numeric_types = array('integer', 'int', 'smallint', 'tinyint', 
		'mediumint', 'bigint');


	function parse_mysql_col_type($val) {
		global $numeric_types, $string_types;
		$type = explode('(', $val);
		$type = $type[0];
		if(in_array($type, $numeric_types)) {
			return 'number';
		} else if (in_array($type, $string_types)) {
			return 'string';
		} else {
			return $type;
		}

	}

	function db_serialize($val) {
		if(is_string($val)) {
			return $val;
		} else if(is_bool($val)) {
			return $val? 1 : 0;
		} else if(is_double($val) || is_int($val)) {
			return $val;
		} else if(is_array($val)) {
			echo 'is array!';
			$str = "";
			$first = True;
			foreach($val as $element) {
				if($first) {
					$first = False;
				} else {
					$str .= ",";
				}

				$str .= db_serialize($element);
			}
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
