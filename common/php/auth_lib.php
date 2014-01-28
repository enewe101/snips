<?php

require_once 'db.php';
$action = get_var('action');

if($action == 'get_login_form') {
	put_login_form();
}


function is_auth($session, $auth_id) {
	// check if the user is logged in. If not, show login form.
	$logged = FALSE;
	$authed = FALSE; 
	if($session['logged']) {
		$logged = TRUE;
		$user_auths = $_SESSION['auths'];
		if(in_array($auth_id, $user_auths, TRUE)) {
			$authed = TRUE;
		}
	}
	return array('logged'=>$logged, 'authed'=>$authed);
}


function put_login_widget() {
	if(!$_SESSION['logged']) { ?>
		<a id='login_link' href='#'>login</a>
		<div id='login_form_container_top_right'>
			<div id='cancel_login' class='cancel_x'>x</div>
			<? put_login_form(); ?>
		</div>

		<script type='text/javascript'>
		(function() {
			$('#login_link').click(function(e) {
				e.preventDefault();
				$('#login_form_container_top_right').css(
					'display', 'block');
				$('#email').focus();
			});
			$('#cancel_login').click(function(e) {
				$('#login_form_container_top_right').css(
					'display', 'none');
			});
		}());
		</script>

	<?php } else { 
		echo $_SESSION['display_name'];
		put_logout_link();
	}
}


function put_logout_link() {
	?>
	<a id='logout_link' href='#'>logout</a>
	<script type='text/javascript'>
	(function() {
		$('#logout_link').click(function(e) {
			e.preventDefault();
				
			$.ajax({
				'url': 'http://shpow.com/common/php/auth.php',
				'data': {'action': 'logout'},
				'type': 'POST',
				'dataType': 'json', // js boolean true or false
				'success': function(json) {
					if(json) {
						window.location.reload();
					} else if(json===null) {
						$('#login_notification').html(
							'there was a problem');
					} else {
						$('#login_notification').html(
							'bad user name and password');
					}
				},
				'error': function(xhr, status) {
					$('#login_notification').html(
						'there was a problem');
				}
			});
		})
	}());
	</script>
	<?php
}


function put_login_form($suffix='') { 
	// The suffix lets you place multiple login forms without their id
	// attributes colliding.  It's optional if there is only one login form
	// on the page, which is typical.
	?>	
	<p id='login_notification<?php echo $suffix;?>'></p>
	<form>
		<div class='form_line'>
			<label class='label_medium' for='email<?php echo $suffix;?>'>
				Email:</label>
			<input type='text' id='email<?php echo $suffix;?>' name='email' 
			class='input_medium' />
		</div>

		<div class='form_line'>
			<label class='label_medium' for='password<?php echo $suffix;?>'>
			Password:</label>
			<input type='password' id='password<?php echo $suffix;?>' 
			name='password' class='input_medium' />
		</div>

		<div class='form_line'>
			<label class='label_medium' for='password'>&nbsp;
			</label>
			<button id='login_button<?php echo $suffix;?>'>login</button>
		</div>

	</form>
	<script type='text/javascript'>
		(function(){
			$('#login_button<?php echo $suffix;?>').click(function(e) {
				e.preventDefault();
				data_obj = {
					'action': 'login',
					'email': $('#email<?php echo $suffix;?>').val(),
					'pwd': $('#password<?php echo $suffix;?>').val()
				};
					
				$.ajax({
					'url': 'http://shpow.com/common/php/auth.php',
					'data': data_obj,
					'type': 'POST',
					'dataType': 'json', // js boolean true or false
					'success': function(json) {
						if(json) {
							window.location.reload();
						} else if(json===null) {
							$('#login_notification<?php echo $suffix;?>').html(
								'null returned');
						} else {
							$('#login_notification<?php echo $suffix;?>').html(
								'bad user name and password');
						}
					},
					'error': function(xhr, status) {
						$('#login_notification<?php echo $suffix;?>').html(
							'http problem: ' + status);
					}
				});
			});
		}());
	</script>
	<?php
}

?>
