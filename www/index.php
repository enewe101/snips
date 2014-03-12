<!DOCTYPE html>
<?php
require_once '../common/php/db.php'; 
$conn = connect_db('uedwardn_clips');

$source_id = get_var('source_id');
if(is_null($source_id)) {
	$source_id = 'null';
}
?>

<html>
	<head>
		<script type='text/javascript' src='../common/js/jquery.js'>
		</script>
		<script type='text/javascript' src='js/pdf.js'></script>
		<script type='text/javascript'>
			var debug = true;
			var source_id = <?php echo $source_id; ?>;
		</script>
		<script type='text/javascript' src='js/reader_view.js'></script>
		<script type='text/javascript' src='js/PDFViewer.js'></script>
		<script type='text/javascript' src='js/NotesViewer.js'></script>
		<script type='text/javascript' src='js/List.js'></script>
		<script type='text/javascript' src='js/app_lib.js'></script>
		<script type='text/javascript' src='js/editable_text.js'></script>

		<script type='text/javascript' src='js/CopyButton.js'></script>

		<script type='text/x-mathjax-config'>
			MathJax.Hub.Config(
				{tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
		</script>
		<script type='text/javascript' src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

		<link rel='stylesheet' type='text/css' href='css/main.css' />
		<link rel='stylesheet' type='text/css' href='css/list.css' />
		<link rel='stylesheet' type='text/css' href='css/NotesViewer.css' />
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
			<!--div id='right'>
				<div id='pdf_view_wrapper'></div>
			</div>

			<div id='left'>
				<div id='notes_wrapper'> </div>
			</div-->
		</div>

		<div id='footer'>
		</div>

	</body>
</html>
