<?php
	// Authentication goes as follows.  First, the user is authenticated 
	// against her credentials.  Next the user's info and privileges are
	// recorded to the $_SESSION, as well as marking the user as authenticated

	session_start();

	require_once 'db.php';
	$DB_NAME = 'uedwardn_users';

	$action = get_var('action');
	$email = get_var('email');
	$pwd = get_var('pwd');

	if($action == 'login') {

		// First, basic validation of posted variables
		if(is_null($email) || is_null($pwd)) {
			echo 'null';  // this signals an error, not just failed login
			exit(1);

		} else {

			// Attempt to authenticate the user's credentials
			$user_id = authenticate_user($email, sha1($pwd));
			if(is_null($user_id)) {	// indicates an error 
				echo 'null';
				exit(1);
			} else if(!$user_id) {	// indicates failed authentication
				echo 'false';
				exit(0);
			}

			// attempt to get the user's privileges and details (deets)
			$auths = get_user_auths($user_id);
			$deets = get_user_deets($user_id);
			if(is_null($auths) || is_null($deets)) {
				echo 'null';
				exit(1);
			}
			$deets['auths'] = $auths;

			// Mark logged in and copy this info over to the session
			$_SESSION['logged'] = true;
			foreach($deets as $key => $val) {
				if ($key == 'user_id') {
					$_SESSION[$key] = (int)$val;
				} else {
					$_SESSION[$key] = $val;
				}
			}

			// Report to the client that login was successful
			echo 'true';
			exit(0);
		} 

	} else if($action == 'logout') {
		$_SESSION = array();
		echo 'true';
	}


	function authenticate_user($email, $pwd_hash) {
		$con = connect_db($GLOBALS['DB_NAME']);
		$sql = "SELECT user_id from users WHERE email='$email'";
		$sql .=	" AND pwd_hash='$pwd_hash';";

		$result = mysqli_query($con, $sql);
		$err = mysqli_error($con);
		if($err) {
			return null;
		}

		if(!mysqli_num_rows($result)) {
			return false;
		}

		$row = mysqli_fetch_array($result);
		$user_id = $row[0];
		return $user_id;
	}

	function get_user_deets($user_id) {
		$con = connect_db($GLOBALS['DB_NAME']);
		$sql = "SELECT user_id, email, display_name"; 
		$sql .= " FROM users WHERE user_id=$user_id;";

		$result = mysqli_query($con, $sql);
		$err = mysqli_error($con);
		if($err || !mysqli_num_rows($result)) {
			return null;
		}

		return mysqli_fetch_assoc($result);
	}

	function get_user_auths($user_id) {

		$con = connect_db($GLOBALS['DB_NAME']);
		$sql = "SELECT `auth_id` FROM `user_groups`, `group_auths`";
		$sql .= " WHERE user_id=$user_id";
		$sql .= " AND `user_groups`.group_id=`group_auths`.group_id;";

		$result = mysqli_query($con, $sql);
		$err = mysqli_error($con);
		if($err) {
			return null;
		}

		$auths = array();
		while($row = mysqli_fetch_array($result)) {
			$auths[] = (int)$row[0];
		}
		return $auths;
	}

?>
