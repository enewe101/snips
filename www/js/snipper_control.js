
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
	width = $(window).width();
	height = $(window).height();
	half_width = width/2 - 10;

	$('#left').css('width', half_width + 'px');
	$('#right').css('width', half_width + 'px');
}

function init() {


	layout_page();
	try {
		view = new View();
	} catch (e) {
		alert(e);
	}

	view.layout();
	view_bind_events();

	if(source_id) {
		get_source(source_id, on_get_source);
		get_snips(source_id, on_get_snips);
	}

}

function select_snips_if_any() {
	if(snips.length > 0) {
		view.highlight_snip(pointer);
	}
}

function on_get_snips(sent_snips) {
	for(var i=0; i< sent_snips.length; i++) {
		add_snip(sent_snips[i]);
	}
	select_snips_if_any();
}

function add_snip(snip) {
	snips.push(snip);
	view.add_snip(snip);
}

function view_bind_events() {
	$('#prev').on('click', function(e) {
		if(page == 1) {
			return;
		}
		page = Math.max(page-1, 0);
		pdf.getPage(page).then(get_page);

	});
	$('#next').on('click', function(e) {
		if(page  == pdf.numPages) {
			return;
		}
		page = Math.min(page+1, pdf.numPages);
		pdf.getPage(page).then(get_page);
	});

	// the handling of the keyboard is separated into keyup and keydown
	// certain events, such as tabbing from one field to the other are
	// better handled onkeydown, becaus their behavior depends on whether
	// the shift key was being held while the key went down.  But for other
	// events, such as printable keystrokes, you need to wait for key up
	// otherwise the character will not be received by the textarea before the
	// event is triggered
	$(document).keydown(handle_keydown);
	$(document).keyup(handle_keyup);

	view.bind_keyword_editor_focus(function() {
		if(fire_on_focus) {
			edit_or_insert('keywords');
		}
	});

	view.bind_desc_editor_focus(function() {
		if(fire_on_focus) {
			edit_or_insert('desc');
		}
	});

	view.bind_keyword_editor_blur(stop_and_save);
	view.bind_desc_editor_blur(stop_and_save);

}

function move_pointer_up() {
	if(snips.length > 0) {
		pointer = (pointer + 1)% snips.length;
		view.highlight_snip(pointer);
	}
}

function move_pointer_down() {
	if(snips.length > 0) {
		if(pointer - 1 < 0) {
			pointer = snips.length - 1;
		} else {
			pointer = pointer - 1;
		}
		view.highlight_snip(pointer);
	}
}

function start_snip_insert(md) {
	edit_type = 'insert';
	mode = md;

	view.new_edit_at(insert_pointer);
	view.highlight_snip(insert_pointer);

	if(mode == 'keywords') {
		start_keyword_edit(insert_pointer);
	} else if(mode == 'desc') {
		start_desc_edit(insert_pointer);
	}

	update_previews();
}

function start_keyword_edit(insert_pointer) {
	fire_on_focus = false;
	view.start_keyword_edit(insert_pointer);
	fire_on_focus = true;
}

function start_desc_edit(insert_pointer) {
	fire_on_focus = false;
	view.start_desc_edit(insert_pointer);
	fire_on_focus = true;
}

function start_snip_edit(md, ptr) {
	edit_type = 'update';
	mode = md;

	view.put_keyword_text(snips[pointer]['keywords']);
	view.put_desc_text(snips[pointer]['desc']);
	view.highlight_snip(insert_pointer);

	if(mode == 'keywords') {
		start_keyword_edit(insert_pointer);
	} else if(mode == 'desc') {
		start_desc_edit(insert_pointer);
	}

	update_previews();
}


function edit_or_insert(mode) {
	insert_pointer = pointer;

	// if there's snips, start editing the current one
	if(snips.length > 0) {
		start_snip_edit(mode, insert_pointer);

	// if there are no snips yet, just insert
	} else {
		start_snip_insert(mode, insert_pointer);
	}
}

function delete_if_any() {
	if(!snips.length) {
		return;
	}
	if(!confirm_delete()) {
		return;
	}
	delete_snip(snips[pointer], on_delete);
	snips.splice(pointer, 1);
	view.remove_snip(pointer);
	pointer = ensure_legal(pointer);
	select_snips_if_any();
}

function on_delete(reply) {
}

function confirm_delete() {
	return confirm('really delete?');
}

function handle_keydown(e) {

	// handle the 'i' key => begin editing highlighted snip keywords
	if(e.which == 73 && mode == 'normal') {
		e.preventDefault();
		edit_or_insert('keywords');

	// handle the 'a' key => begin editing highlighted snip description
	} else if(e.which == 65 && mode == 'normal') {
		e.preventDefault();
		edit_or_insert('desc');
	
	// handle the 'j' key => move pointer up
	} else if(e.which == 74 && mode == 'normal') {
		move_pointer_up();

	// handle the 'k' key => meve pointer down
	} else if(e.which == 75 && mode == 'normal') {
		move_pointer_down();

	// handle the 'o' key => insert before / after
	} else if(e.which == 79 && mode == 'normal') {
		e.preventDefault();
		insert_pointer = determine_insert_position(e);
		start_snip_insert('keywords', insert_pointer);

	// handle the 'd' key => delete if `shift` held
	} else if(e.which == 68 && e.shiftKey && mode == 'normal') {
		e.preventDefault();
		insert_pointer = pointer
		delete_if_any();
	

//	// Handle TAB
//	} else if(e.which == 9) {
//		e.preventDefault();
//		if(mode == 'keywords') {
//			if(e.shiftKey) {
//				mode = 'normal';
//				view.stop_keyword_edit(insert_pointer);
//				save_and_clear();
//
//			} else {
//				mode = 'desc';
//				view.stop_keyword_edit(insert_pointer);
//				start_desc_edit(insert_pointer);
//			}
//
//		} else if(mode== 'desc') {
//			if(e.shiftKey) {
//				mode = 'keywords';
//				start_keyword_edit(insert_pointer);
//				view.stop_desc_edit(insert_pointer);
//
//			} else {
//				mode = 'normal';
//				view.stop_desc_edit(insert_pointer);
//				save_and_clear();
//			}
//		}

	// Handle ESC
	} else if(e.which == 27) {
		e.preventDefault();
		stop_and_save();
	}	
}

function stop_and_save() {
	if(mode == 'keywords') {
		mode = 'normal';
		view.stop_keyword_edit(insert_pointer);
		save_and_clear();

	} else if(mode == 'desc') {
		mode = 'normal';
		view.stop_desc_edit(insert_pointer);
		save_and_clear();
	}
}

function determine_insert_position(e) {
	var insert_pointer;

	// if there's no snips, insert at zero
	if(snips.length == 0) {
		insert_pointer = 0;

	// otherwise it depends on whether 'o' or 'O' was pressed
	} else {
		if(e.shiftKey) {
			insert_pointer = pointer;
		} else {
			insert_pointer = pointer + 1;
		}
	}
	return insert_pointer;
}

function handle_keyup(e) {
	if(mode == 'normal') {
		// do nothing

	} else if(mode == 'keywords') {
		update_previews();

	} else if(mode == 'desc') {
		update_previews();
	}
}

function update_description_previews() {
		var text = view.get_desc_val();
		view.put_desc_preview(text, insert_pointer);
}

function update_keyword_previews() {
		var text = view.get_keyword_val();
		view.put_keyword_preview(text, insert_pointer);
}

function update_previews() {
	update_description_previews();
	update_keyword_previews();
}

function ensure_legal(ptr) {
	// keep pointer within the bounds of the snips array or at zero
	ptr = Math.min(ptr, snips.length-1);
	ptr = Math.max(ptr, 0);
	return ptr;
}

function save_and_clear() {

	// get the text currently in the view's editors, then clear them
	var kw_text = view.get_keyword_val().trim();
	var desc_text = view.get_desc_val().trim();
	view.clear_editors();


//	// if there is nothing to save (aside from whitespace) abort.
//	if(kw_text == '' && desc_text == '') {
//
//		// if this was an existing snip, delete it
//		if(edit_type=='update') {
//			var clip_id = snips[insert_pointer]['id'];
//			delete_snip(clip_id, function(){});
//			snips.splice(insert_pointer, 1);
//		}
//
//		// remove the view's representation
//		view.remove_snip(insert_pointer);
//		pointer = ensure_legal(pointer);
//		if(snips.length > 0) {
//			view.highlight_snip(pointer);
//		}
//
//		return;
//	}

	// if this is an update, get the snip, otherwise make a new one
	if(edit_type == 'update') {
		var snip_obj = snips[insert_pointer];
		snip_obj['keywords'] = kw_text;
		snip_obj['desc'] = desc_text;

	} else {
		var snip_obj = {
			'keywords': kw_text,
			'desc': desc_text,
			'id': null,
			'source_id': source_id
		};
	}

	// TODO: is there a circumstance where this does anything?
	pointer = insert_pointer;

	// if inserting a new snip, splice it in
	if(edit_type == 'insert') {
		snips.splice(insert_pointer, 0, snip_obj);

	// if updating, overwrite the old version
	} else {
		snips[insert_pointer] = snip_obj;
	}

	// make the temp edit into a normal clip
	view.mark_clip_pending(insert_pointer);

	// TODO make the snip store all fields, so you just pass a snip obj
	// and make the snip not store any ui elements
	if(edit_type == 'update') {
		update_snip(snip_obj, clip_saved_ok(insert_pointer));

	} else {
		save_snip(snip_obj, clip_saved_ok(insert_pointer));
	}
}	

function clip_saved_ok(idx) {
	return function(reply) {
		view.clip_received(idx);

		// the reply contains the insert id for the snip
		// this is needed if the snip gets edited
		snips[idx]['id'] = reply['id'];
	};
}


