<?php
 session_start();
// if(!$_SESSION['auth']) {
//	 echo '<html><body>You are not authorized to view this content</body></htmlb>';
//	 exit(0);
// }

 $path = $_GET['path'];
 $name = $_GET['name'] . '.pdf';

 // We'll be outputting a PDF
 header('Content-type: application/pdf');

 // It will be called downloaded.pdf
 header('Content-Disposition: attachment; filename="' . $name . '"');

 // The PDF source is in original.pdf
 readfile($path);
 
?> 
