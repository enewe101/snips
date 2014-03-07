window.onload = init;

var source_view;
var sources_result;

function init() {

	var source_view_wrapper = $('#source_view_wrapper');

	try {
	source_view = new SourcesView({
		'wrapper':source_view_wrapper
	});
	} catch(e) {
		alert(e);
	}

	get_sources({}, on_get_sources);
}

function on_get_sources(data, passthrough) {
	source_view.put_sources(data);
}


