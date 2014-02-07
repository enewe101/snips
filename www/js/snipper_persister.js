window.onload = init;
var page = 1;
var clip_id_inc = 1;



function on_get_source(data) {
	data = data[0];
	var url = 'pdfs/' + data['path'];
	PDFJS.getDocument(url).then(function getPdfHelloWorld(pdf) {
		pdf.getPage(page).then(get_page);
		window.pdf = pdf;
	});
}

function get_page(page) {
	var width = $(window).width();
	var scale = width / 1218;
	var viewport = page.getViewport(scale);

	var canvas = document.getElementById('the-canvas');
	var context = canvas.getContext('2d');
	canvas.height = viewport.height;
	canvas.width = Math.round(width/2 - 16);

	//
	// Render PDF page into canvas context
	//
	page.render({canvasContext: context, viewport: viewport});
}

function get_source(source_id, callback) {

	$.ajax({
		'url' : 'php/get_source.php',
		'type': 'POST',
		'data': {'id': source_id},
		'dataType': 'json',
		'success': function(data, textStatus, jqXHR) {
			callback(data);
		},
		'error': function(jqXHR, status, err) {
			alert(err);
		}
	});
}

function save_snip(data, callback) {
	
	// expects data in this form:
	//	{
	//		'keywords':kw_text,
	//		'desc':desc_text,
	//		'source_id':source_id
	//	}

	$.ajax({
		'url' : 'php/put_snip.php',
		'type': 'POST',
		'data': data,
		'dataType': 'json',
		'success': function(data, textStatus, jqXHR) {
			callback(data);
		},
		'error': function(jqXHR, status, err) {
			alert(err + ':\n' + jqXHR.toSource());
		}
	});
}

function update_snip(data, callback) {
	
	// expects data in this form:
	//	{
	//		'id':clip_id,
	//		'keywords':kw_text,
	//		'desc':desc_text,
	//		'source_id':source_id
	//	}
	
	$.ajax({
		'url' : 'php/update_snip.php',
		'type': 'POST',
		'data': data,
		'dataType': 'json',
		'success': function(data, textStatus, jqXHR) {
			callback(data);
		},
		'error': function(jqXHR, status, err) {
			alert(err);
		}
	});
}

function build_add_form() {
}

