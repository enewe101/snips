<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/common/php/db.php'; 
$conn = connect_db('uedwardn_clips');

$source_id = get_var('source_id');
if(is_null($source_id)) {
	$source_id = 'null';
}
?>

<!DOCTYPE html>
<html>
	<head>

		<script type='text/javascript' src='../../common/js/jquery.js'>
		</script>
		<script type='text/javascript' src='../../common/js/utils.js'>
		</script>
		<script type='text/javascript' src='js/pdf.js'></script>
		<script type='text/javascript'>
			var debug = true;
			var source_id = <?php echo $source_id; ?>;
		</script>

		<script type='text/javascript' src='js/List.js'></script>
		<script type='text/javascript' src='js/app_lib.js'></script>
		<script type='text/javascript' src='js/editable_text.js'></script>
		<script type='text/javascript' src='js/CopyButton.js'></script>
		<script type='text/javascript' src='js/sources_controller.js'></script>
		<script type='text/javascript' src='js/SourcesView.js'></script>
		<script type='text/javascript' src='js/DBResult.js'></script>
		<script type='text/javascript' src='js/Source.js'></script>
		<script type='text/javascript' src='js/AddSource.js'></script>
		<script type='text/javascript' src='js/FormJsonifier.js'></script>
		<script type='text/javascript' src='js/FormFactory.js'></script>
		<script type='text/javascript' src='js/FileInput.js'></script>
		<script type='text/javascript' src='js/FormVerifier.js'></script>

		<script type='text/x-mathjax-config'>
			MathJax.Hub.Config(
				{tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
		</script>
		<script type='text/javascript' src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

		<link rel='stylesheet' type='text/css' href='../../common/css/basic.css' />
		<link rel='stylesheet' type='text/css' href='css/main.css' />
		<link rel='stylesheet' type='text/css' href='css/list.css' />
		<link rel='stylesheet' type='text/css' href='css/SourcesView.css' />
		<link rel='stylesheet' type='text/css' href='css/NotesViewer.css' />
		<link rel='stylesheet' type='text/css' href='css/form.css' />

	</head>

	<body>
	<div id="source_view_wrapper"></div>
	</body>
</html>
