
// ui_state
var mode = 'normal';
var edit_type = 'null';
var update_id = 'null';
var insertion_point = null
var pointer = null;
var snips = [];
var width = null;
var shim = 52;

function view_layout() {
	width = $(window).width();
	height = $(window).height();
	half_width = width/2 - 10;

	$('#left').css('width', half_width + 'px');
	$('#right').css('width', half_width + 'px');
	$('#keywords').css('width', half_width*0.4 + 'px');
	$('#desc').css('width', half_width*0.8 + 'px');
	$('#desc').css('height', height*0.22+ 'px');
	$('#form_area').css('padding-left', Math.max((half_width*0.1)-10,0)+ 'px');
	$('.keywords_header').css('width', (8+0.26*(width/2 - shim)) + 'px');
	$('.description_header').css('width', (8+0.74*(width/2 - shim)) + 'px');
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
}

function move_pointer_up() {
	if(pointer !== null) {
		snips[pointer]['wrapper'].removeClass('highlighted');
		pointer = (pointer + 1)% snips.length;
		snips[pointer]['wrapper'].addClass('highlighted');
	}
}

function move_pointer_down() {
	if(pointer !== null) {
		snips[pointer]['wrapper'].removeClass('highlighted');
		if(pointer - 1 < 0) {
			pointer = snips.length - 1;
		} else {
			pointer = pointer - 1;
		}
		snips[pointer]['wrapper'].addClass('highlighted');
	}
}

function open_existing_clip_for_edit() {
	clip_to_edit = snips.splice(pointer, 1)[0];
	update_id = clip_to_edit['data']['clip_id'];

	clip_to_edit['wrapper'].attr({
		'id':'edit_clip_wrapper',
		'class':'clip edit_clip_wrapper'
	});

	clip_to_edit['keywords'].attr({
		'id':'edit_keywords',
		'class':'keywords',
		'html':'edit_keywords'
	});

	clip_to_edit['description'].attr({
		'id':'edit_description',
		'class':'description',
		'html':'edit_description'
	});

	$('.keywords').css('width', 0.3*(width/2 - shim) + 'px');
	$('.description').css('width', 0.7*(width/2 - shim) + 'px');

	// decrement the pointer, but don't set it below zero.  
	// and if there's nothing left to point to, set it to null
	if(pointer - 1 >= 0) {
		pointer -= 1;
	} else if(snips.length == 0) {
		pointer = null;
	} else {
		pointer = 0;
	}

	highlight_edit();
	$('#keywords').val(clip_to_edit['data']['keywords']);
	$('#desc').val(clip_to_edit['data']['description']);
}

function enter_edit_keyword_mode() {
	$('#keywords').focus();
	update_previews();
	mode = 'edit_keywords';
	$('#edit_keywords').addClass('edit_active');
}

function enter_edit_description_mode() {
	$('#desc').focus();
	update_previews();
	mode = 'edit_description';
	$('#edit_description').addClass('edit_active');
}

function handle_keydown(e) {
	// handle the 'i' key => begin editing highlighted snip keywords
	// we need to simulate just like if we were adding a snip before pointer
	if(e.which == 73 && mode == 'normal') {
		e.preventDefault();

		if(pointer != null && pointer > 0) {
			insertion_point = 'before';
		} else {
			insertion_point = 'after';
		}

		if(snips.length>0) {
			edit_type = 'update';
			open_existing_clip_for_edit();
		} else {
			edit_type = 'insert';
			new_edit_before();
		}

		enter_edit_keyword_mode();

	} else if(e.which == 63 && mode == 'normal') {
		e.preventDefault();
		insertion_point = 'before';
		enter_edit_description_mode();
		clip_to_edit = snips.splice(pointer, 1)[0];
		alert(clip_to_edit.toSource());
		if(snips.length == 0) {
			pointer = null;
		}
	

	// handle the 'j' key => move pointer up
	} else if(e.which == 74 && mode == 'normal') {
		move_pointer_up();
	} else if(e.which == 75 && mode == 'normal') {
		move_pointer_down();

	// handle the 'o' key => insert after
	} else if(e.which == 79 && mode == 'normal') {
		e.preventDefault();
		if(e.shiftKey) {
			new_edit_before();
			insertion_point = 'before';
			edit_type = 'insert';
		} else {
			new_edit_after();
			insertion_point = 'after';
			edit_type = 'insert';
		}
		enter_edit_keyword_mode()
	}

	// Handle TAB
	if(e.which == 9) {
		e.preventDefault();
		if(mode == 'edit_keywords') {
			if(e.shiftKey) {
				mode = 'normal';
				$('#edit_keywords').removeClass('edit_active');
				$('#keywords').blur();
				save_and_clear();
			} else {
				$('#edit_keywords').removeClass('edit_active');
				$('#edit_description').addClass('edit_active');
				$('#desc').focus();
				mode = 'edit_description';
			}

		} else if(mode== 'edit_description') {
			if(e.shiftKey) {
				$('#edit_keywords').addClass('edit_active');
				$('#edit_description').removeClass('edit_active');
				$('#keywords').focus();
				mode = 'edit_keywords';
			} else {
				mode = 'normal';
				$('#edit_description').removeClass('edit_active');
				$('#desc').blur();
				save_and_clear();
			}
		}

	// Handle ESC
	} else if(e.which == 27) {
		e.preventDefault();
		if(mode == 'edit_keywords') {
			mode = 'normal';
			$('#edit_keywords').removeClass('edit_active');
			$('#keywords').blur();
			save_and_clear();
		} else if(mode == 'edit_description') {
			mode = 'normal';
			$('#edit_description').removeClass('edit_active');
			$('#desc').blur();
			save_and_clear();
		}
	}	
}

function new_edit_before() {
	edit_clip_wrapper = make_new_edit();
	var clips_wrapper = $('#clips_wrapper')

	if(pointer === null) {
		clips_wrapper.append(edit_clip_wrapper);
	} else {
		snips[pointer]['wrapper'].before(edit_clip_wrapper);
	}
	$('.keywords').css('width', 0.3*(width/2 - shim) + 'px');
	$('.description').css('width', 0.7*(width/2 - shim) + 'px');
	highlight_edit();
}

function new_edit_after() {
	edit_clip_wrapper = make_new_edit();
	var clips_wrapper = $('#clips_wrapper')

	if(pointer === null) {
		clips_wrapper.append(edit_clip_wrapper);
	} else {
		snips[pointer]['wrapper'].after(edit_clip_wrapper);
	}
	$('.keywords').css('width', 0.3*(width/2 - shim) + 'px');
	$('.description').css('width', 0.7*(width/2 - shim) + 'px');
	highlight_edit();
}

function highlight_edit() {
	if(pointer !== null) {
		snips[pointer]['wrapper'].removeClass('highlighted');
	}
	$('#edit_clip_wrapper').addClass('highlighted');
}

function refresh_highlight(){
	snips[pointer]['wrapper'].addClass('highlighted');
}

function make_new_edit() {
	var edit_clip_wrapper = $('<div/>', {
		'id':'edit_clip_wrapper',
		'class':'clip edit_clip_wrapper'
	});

	var edit_keywords = $('<div/>', {
		'id':'edit_keywords',
		'class':'keywords',
		'html':'edit_keywords'
	});

	var edit_description = $('<div/>', {
		'id':'edit_description',
		'class':'description',
		'html':'edit_description'
	});

	edit_clip_wrapper.append(edit_keywords);
	edit_clip_wrapper.append(edit_description);
	edit_clip_wrapper.append($('<div class="clear"/>'));
	return edit_clip_wrapper;
}

function handle_keyup(e) {
	if(mode == 'normal') {


	} else if(mode == 'edit_keywords') {
		update_previews();

	} else if(mode == 'edit_description') {
		update_previews();
	}
}

function update_previews() {
	update_description_previews();
	update_keyword_previews();
}

function update_description_previews() {
		var text = $('#desc').val();
		put_text_or_jack($('#edit_description'), text);
}

function update_keyword_previews() {
		var text = $('#keywords').val();
		put_text_or_jack($('#edit_keywords'), text);
}

function put_text_or_jack(jquery_elm, text) {
		if(text.trim() == '') {
			jquery_elm.html('&nbsp;');
		} else {
			jquery_elm.text(text);
		}
}

function clear_snip_editors() {
	// clear the editing textareas
	$('#desc').val('');
	$('#keywords').val('');
}

function remove_snip_preview() {
	$('#edit_clip_wrapper').remove();
}

function save_and_clear() {

	// Is there anything to save?  If the currently-edited clip is empty
	// then kill it, clear the textareas, but don't save anything
	var kw_text = $('#keywords').val().trim();
	var desc_text = $('#desc').val().trim();
	if(kw_text == '' && desc_text == '') {
		clear_snip_editors();
		remove_snip_preview();
		//refresh_highlight();

	// There is stuff to save.  Make a permanent version of the clip in
	// the ui and ask the controller to save the data to the db
	} else {

		clip_obj = {
			'wrapper': $('#edit_clip_wrapper'),
			'keywords': $('#edit_keywords'),
			'description': $('#edit_description'),
			'data': {
				'keywords': kw_text,
				'description': desc_text,
			}
		};

		if(edit_type == 'update') {
			clip_obj['data']['clip_id'] = update_id;
		} else {
			clip_obj['data']['clip_id'] = null;
		}

		// keep track of the new snips ui element
		if(insertion_point == 'after') {
			if( pointer !== null) {
				pointer += 1;
			} else {
				pointer = 0;
			}
			snips.splice(pointer, 0, clip_obj);
		} else {
			if( pointer === null) {
				pointer = 0;
			}
			snips.splice(pointer, 0, clip_obj);
		}

		// make the temp edit into a normal clip
		clip_obj['wrapper'].attr({
			'id': 'clip' + clip_id_inc, 
		}).addClass('clip_pending');

		clip_obj['keywords'].attr({
			'id': 'clip_keywords' + clip_id_inc
		}).val('');

		clip_obj['description'].attr({
			'id': 'clip_description' + clip_id_inc
		}).val('');

		clip_id_inc += 1;
		clear_snip_editors();

		if(edit_type == 'update') {
			update_snip({
				'id': update_id,
				'keywords':kw_text,
				'desc':desc_text,
				'source_id':source_id
			}, clip_saved_ok(clip_obj));
		} else {
			save_snip({
				'keywords':kw_text,
				'desc':desc_text,
				'source_id':source_id
			}, clip_saved_ok(clip_obj));
		}
	}
}	

function clip_saved_ok(clip_obj) {
	return function(reply) {
		var clip_wrapper = clip_obj['wrapper'];
		clip_wrapper.removeClass('edit_clip_wrapper clip_pending');
		clip_wrapper.addClass('clip');
		clip_obj['data']['clip_id'] = reply['id'];
	};
}

