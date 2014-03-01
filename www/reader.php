<!DOCTYPE html>
<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/common/php/db.php'; 
$conn = connect_db('uedwardn_clips');

$source_id = get_var('source_id');
if(is_null($source_id)) {
	$source_id = 'null';
}
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
		<script type='text/javascript' src='js/reader_control.js'></script>
		<script type='text/javascript' src='js/reader_model.js'></script>
		<script type='text/javascript' src='js/reader_view.js'></script>
		<link rel='stylesheet' type='text/css' href='css/main.css' />
		<link rel='stylesheet' type='text/css' href='../../common/css/basic.css' />
	</head>
	<body>

		<div id='header'>
			<div id='banner'>
				<div id='logo'>
				</div>
			</div>
		</div>

		<div id='middle'>

			<div id='right'>

				<div id="nav_toolbar">
					<div id="prev">&lt;</div>
					<div id="next">&gt;</div>
					<div class="clear"></div>
				</div>

				<canvas id="the-canvas">
				</canvas>

			</div>

			<div id='left'>
				<div id='annotation_area'>

					<div id='form_area'>

						<div class='form_line'>
							<textarea name='desc' id='desc'></textarea>
						</div>
					</div>

					<div class='clip_header'>
						<div class='description_header'>
							Description
						</div>
						<div class='clear'></div>
					</div>

					<div id='clips_wrapper'></div>

				</div>
			</div>


		</div>

		<div id='footer'>
		</div>

	</body>
</html>
