window.onload = init;
var page = 1;
var clip_id_inc = 1;
var pdf_viewer;


function init() {

	pdf_viewer = new PDFViewer($('#pdf_view_wrapper'));
	get_source(source_id, on_get_source);
	
	view_layout();
	view_bind_events();

}


function on_get_source(data) {
	data = data[0];
	var url = 'pdfs/' + data['path'];
	pdf_viewer.get_document(url); 
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

