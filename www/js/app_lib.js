
function get_opt(keyname, obj, default_val) {
	if(keyname in obj) {
		return obj[keyname];
	} else {
		return default_val;
	}
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

function save_snip(data, callback, backlink) {
	
	// expects data in this form:
	//	{
	//		'desc':desc_text,
	//		'source_id':source_id
	//	}

	$.ajax({
		'url' : 'php/put_snip.php',
		'type': 'POST',
		'data': data,
		'dataType': 'json',
		'success': function(data, textStatus, jqXHR) {
			callback(data, backlink);
		},
		'error': function(jqXHR, status, err) {
			alert(err + ':\n' + jqXHR.toSource());
		}
	});
}

function update_snip(snip_obj, callback, backlink) {
	
	// expects data in this form:
	//	{
	//		'id':clip_id,
	//		'desc':desc_text,
	//		'source_id':source_id
	//	}
	//
	
	$.ajax({
		'url' : 'php/update_snip.php',
		'type': 'POST',
		'data': snip_obj,
		'dataType': 'json',
		'success': function(data, textStatus, jqXHR) {
			callback(data, backlink);
		},
		'error': function(jqXHR, status, err) {
			alert(err);
		}
	});
}

function delete_snip(snip_obj, callback, backlink) {
	$.ajax({
		'url' : 'php/delete_snip.php',
		'type': 'POST',
		'data': snip_obj,
		'dataType': 'json',
		'success': function(data, textStatus, jqXHR) {
			callback(data, backlink);
		},
		'error': function(jqXHR, status, err) {
			alert(err);
		}
	});
}

function build_add_form() {
}

