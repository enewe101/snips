window.onload = init;
var page = 1;
var clip_id_inc = 1;



function get_snips(source_id, callback) {

	$.ajax({
		'url' : 'php/get_snips.php',
		'type': 'POST',
		'data': {'source_id': source_id},
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

function update_snip(snip_obj, callback) {
	
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
		'data': snip_obj,
		'dataType': 'json',
		'success': function(data, textStatus, jqXHR) {
			callback(data);
		},
		'error': function(jqXHR, status, err) {
			alert(err);
		}
	});
}

function delete_snip(snip_obj, callback) {
	$.ajax({
		'url' : 'php/delete_snip.php',
		'type': 'POST',
		'data': snip_obj,
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

