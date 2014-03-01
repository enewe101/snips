
// ui_state
var mode = 'normal';
var edit_type = 'null';
var pointer = 0;
var insert_pointer = 0;
var snips = [];
var width = null;
var shim = 52;
var view;
var fire_on_focus = true;

function layout_page() {
}

function init() {


	layout_page();
	view = new View();

	view.layout();
	view_bind_events();

	if(source_id) {
		get_source(source_id, on_get_source);
		get_snips(source_id, on_get_snips);
	}

}



