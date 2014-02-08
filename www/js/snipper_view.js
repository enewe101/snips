
function View() {

	this.snip_divs = [];

	this.layout = function() {
		width = $(window).width();
		height = $(window).height();
		half_width = width/2 - 10;

		this.clips_wrapper = $('#clips_wrapper');
		this.keyword_editor = $('#keywords');
		this.desc_editor = $('#desc');
		this.form_area = $('#form_area');
		this.keyword_header = $('.keywords_header');
		this.desc_header = $('.description_header');

		// Apply styling based on the size of viewport
		this.keyword_editor.css('width', half_width*0.4 + 'px');
		this.desc_editor.css('width', half_width*0.8 + 'px');
		this.desc_editor.css('height', height*0.22+ 'px');
		this.form_area.css('padding-left', 
			Math.max((half_width*0.1)-10,0)+ 'px');
		this.keyword_header.css('width', (8+0.26*(width/2 - shim)) + 'px');
		this.desc_header.css('width', (8+0.74*(width/2 - shim)) + 'px');

		// debug
		this.keyword_editor.on('blur', function() {console.log('kw blur');});
		this.desc_editor.on('blur', function() {console.log('desc blur');});
		this.keyword_editor.on('focus', function() {console.log('kw focus');});
		this.desc_editor.on('focus', function() {console.log('desc focus');});
	}

	// returns the value currently in the keyword editor
	this.get_keyword_val = function() {
		return this.keyword_editor.val();
	}
	
	// returns the value currently in the description editor
	this.get_desc_val = function() {
		return this.desc_editor.val();
	}

	this.put_desc_preview = function(text, idx) {
		if(text == '') {
			this.snip_divs[idx]['desc'].html('&nbsp');
		} else {
			this.snip_divs[idx]['desc'].text(text);
		}
	}

	this.put_keyword_preview = function(text, idx) {
		if(text == '') {
			this.snip_divs[idx]['keywords'].html('&nbsp;');
		} else {
			this.snip_divs[idx]['keywords'].text(text);
		}
	}

	this.clear_editors = function() {
		// clear the editing textareas
		this.desc_editor.val('');
		this.keyword_editor.val('');
	};

	this.highlight_snip = function(idx) {
		if(idx>this.snip_divs - 1 || idx < 0) {
			alert('error in view.highlight_snip(idx): idx (' + idx + ')'
				+ ' should be between 0 and snip_divs.length ('  
				+ this.snip_divs.length);
		}

		for(var i=0; i<this.snip_divs.length; i++) {
			this.snip_divs[i]['wrapper'].removeClass('highlighted');
		}

		this.snip_divs[idx]['wrapper'].addClass('highlighted');
	};

	this.remove_snip = function(idx) {
		this.snip_divs[idx]['wrapper'].remove();
		this.snip_divs.splice(idx,1);
	}

	// TODO make this work by passing only the snip div id
	this.mark_clip_pending = function(idx) {
		this.snip_divs[idx]['wrapper'].addClass('clip_pending');
	}

	this.clip_received = function(idx) {
		this.snip_divs[idx]['wrapper'].removeClass('clip_pending');
	}

	this.new_snip = function() {
		var new_wrapper = $('<div/>', {
			'class':'clip',
		});

		var jack = $('<div/>', {
			'class':'jack',
			'html':'&nbsp;'
		});

		var new_keyword_previewer = $('<div/>', {
			'class':'keywords'
		});

		var new_description_previewer = $('<div/>', {
			'class':'description'
		});

		new_keyword_previewer.css('width', 0.3*(width/2 - shim) + 'px');
		new_description_previewer.css('width', 0.7*(width/2 - shim) + 'px');

		new_wrapper.append(jack);
		new_wrapper.append(new_keyword_previewer);
		new_wrapper.append(new_description_previewer);
		new_wrapper.append($('<div class="clear"/>'));
		
		new_clip_obj = {
			'wrapper' : new_wrapper,
			'desc': new_description_previewer,
			'keywords': new_keyword_previewer
		};

		return new_clip_obj;
	}


	this.put_keyword_text = function(text) {
		this.keyword_editor.val(text);
	}

	this.put_desc_text = function(text) {
		this.desc_editor.val(text);
	}

	this.start_keyword_edit = function(idx) {
		this.keyword_editor.focus();
		this.snip_divs[idx]['keywords'].addClass('edit_active');
	}

	this.stop_keyword_edit = function(idx) {
		this.keyword_editor.blur();
		this.snip_divs[idx]['keywords'].removeClass('edit_active');
	}

	this.bind_keyword_editor_blur = function(callback) {
		this.keyword_editor.on('blur', callback);
	}

	this.bind_desc_editor_blur = function(callback) {
		this.desc_editor.on('blur', callback);
	}

	this.bind_desc_editor_focus = function(callback) {
		this.desc_editor.on('focus', callback);
	};

	this.bind_keyword_editor_focus = function(callback) {
		this.keyword_editor.on('focus', callback);
	};

	this.start_desc_edit = function(idx) {
		this.desc_editor.focus();
		this.snip_divs[idx]['desc'].addClass('edit_active');
	}

	this.stop_desc_edit = function(idx) {
		this.desc_editor.blur();
		this.snip_divs[idx]['desc'].removeClass('edit_active');
	}

	// this function creates a new snip, and inserts it in
	// the position designated by idx.  idx should be 
	// 0 <= idx <= this.snip_divs.length
	this.new_edit_at = function(idx) {

		// validate input
		if (idx < 0 || idx > this.snip_divs.length) {
			alert('error in view.new_edit_at: ' + idx + ' is not within '
					+ '(0, ' + this.snip_divs.length + '), inclusive.');
		}

		
		new_clip_obj = this.new_snip();
		new_clip_wrapper = new_clip_obj['wrapper'];

		if(idx == this.snip_divs.length) {
			this.clips_wrapper.append(new_clip_wrapper);
		} else {
			this.snip_divs[idx]['wrapper'].before(new_clip_wrapper);
		}

		this.snip_divs.splice(idx, 0, new_clip_obj);
	}

	this.add_snip = function(snip) {
		new_snip_obj = this.new_snip();
		new_snip_obj['keywords'].text(snip['keywords']);
		new_snip_obj['desc'].text(snip['desc']);
		new_snip_wrapper = new_snip_obj['wrapper'];
		this.clips_wrapper.append(new_snip_wrapper);
		this.snip_divs.push(new_snip_obj);
	}
}
