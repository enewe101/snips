function NotesViewer(options) {

	this.wrapper = get_opt('wrapper', options, null);
	this.note_width = get_opt('note_width', options, '250px');

	this.fire_on_blur = true;
	this.notes_array = [];
	this.notes_map = {};
	this.new_note_editable = null;
	this.note_id_inc = 0;

	this.init = function() {
		this.make_html();
	};

	this.set_handlers = function(handler) {
		this.handler = handler;
	};

	this.make_html = function() {
		this.list_wrapper = $('<div id="list_wrapper" />');
		this.wrapper.append(this.list_wrapper);
		this.wrapper.append($('<div class="clear" />'));

		this.notes_list = new List({
			'wrapper': this.list_wrapper, 
			'num_cols': 2,
		});

		var new_note_wrapper = $('<div />');
		this.new_note_editable = new EditableText({
		   	'wrapper': new_note_wrapper, 
			'width': this.note_width,
			'empty_text': 'add note...'
		});

		var note_killer = $('<div class="kill_space" />');

		this.notes_list.add_item([new_note_wrapper, note_killer]);

		this.new_note_textarea = this.new_note_editable.get_input();
		this.bind_events_new_note_textarea();
	};

	this.bind_events_new_note_textarea = function() {
		this.new_note_textarea.blur(function(o) {
			return function() {
				if(o.fire_on_blur) {
					o.add_and_save();
				}
			}
		}(this));

		this.new_note_textarea.on('keydown', function(o) {
			return function(e) {
				if(e.which == 13 && !e.shiftKey) {
					e.preventDefault();
					o.fire_on_blur = false;
					o.new_note_textarea.blur();
					o.fire_on_blur = true;
					o.add_and_save();
					o.new_note_editable.focus();
				}
			};
		}(this));
	};

	this.bind_events_note = function(o) {
	   return function(editable_note, note_id, backlink) {

			var index = o.notes_map[backlink];
			var note_row_wrapper = o.notes_array[index]['list_row']['wrapper'];
			var display = o.notes_array[index]['note'].get_display().get();
			var killer = o.notes_array[index]['killer'];

			editable_note.get_input().blur(function(e) {
				if(o.fire_on_blur) {
					MathJax.Hub.Queue([
						"Typeset",
						MathJax.Hub,
						display
					]);
					o.update(note_id, $(this).val(), backlink);
				}
			});

			editable_note.get_input().keydown(function(e) {
				if(e.which == 13 && !e.shiftKey) {
					e.preventDefault();
					o.fire_on_blur = false;
					$(this).blur();
					o.fire_on_blur = true;
					MathJax.Hub.Queue([
						"Typeset",
						MathJax.Hub,
						display
					]);
					o.update(note_id, $(this).val(), backlink);
				}
			});

			note_row_wrapper.hover(
				function() {
					killer.addClass('kill_visible');
				},
				function() {
					killer.removeClass('kill_visible');
				}
			);
	   };

	}(this);

	this.bind_events_killer = function(o) {
		return function(killer, note_id, backlink) {
			killer.click(function() {
				o.delete(note_id, backlink)
			});

			killer.hover(
				function() {
					$(this).addClass('kill_hover');
					$(this).removeClass('kill_visible');
				},
				function() {
					$(this).removeClass('kill_hover');
					$(this).addClass('kill_visible');
				}
			);

			killer.attr('class', 'kill');
		};
	}(this);

	this.delete = function(note_id, backlink) {
		var notes_index = this.notes_map[backlink];

		this.notes_list.remove(notes_index);
		this.notes_array.splice(notes_index, 1);

		delete this.notes_map[backlink];
		this.refresh_notes_map(notes_index);

		this.handler.del(note_id, this.on_deleted, backlink);
	};

	this.refresh_notes_map = function(deleted_index) {
		for(var i in this.notes_map) {
			if(this.notes_map[i]>deleted_index) {
				this.notes_map[i] -= 1;
			}
		}
	};

	this.on_deleted = function(o) {
		return function(data, backlink) {
			// nothing to do after deleting...
		};
	}(this);

	this.update = function(note_id, text, backlink) {
		this.handler.update(note_id, text, this.on_updated, backlink);
	};

	this.on_updated = function(o) {
		return function(data, backlink) {
			// nothing to do after updating...
		};
	}(this);

	this.add_and_save = function() {
		var note_text = this.new_note_textarea.val().trim();
		if(note_text == '') {
			return;
		}

		var backlink = this.add(note_text);
		this.handler.save(note_text, this.on_saved, backlink);

		this.new_note_editable.val('');
	};

	this.on_saved = function(o) {
		return function(data, backlink) {
			var note_id = data['id'];
			var note_index = o.notes_map[backlink];
			var added_note = o.notes_array[note_index]['note'];
			o.bind_events_note(added_note, note_id, backlink);

			var killer = o.notes_array[note_index]['killer'];
			o.bind_events_killer(killer, note_id, backlink);
		};
	}(this);

	this.add = function(text) {
		var new_note = this.make_new_note(text);
		var note_killer = $('<div class="kill_space" />');
		var list_row = this.notes_list.add_item_at(
			[new_note.get_wrapper(), note_killer],
		   	this.notes_array.length
		);
		MathJax.Hub.Queue([
			"Typeset",
			MathJax.Hub,
			new_note.get_display().get()
		]);
		var entry = {
			'note':new_note,
		   	'killer':note_killer,
			'list_row': list_row
		};
		this.notes_array.push(entry);
		var note_view_id = this.inc();
		this.notes_map[note_view_id] = this.notes_array.length-1;
		return note_view_id;
	};

	this.add_note = function(note_data) {
		var note_id = note_data['id'];
		var note_text = note_data['desc'];
		var new_note = this.make_new_note(note_text);
		var note_killer = $('<div class="kill_space" />');

		var list_row = this.notes_list.add_item_at(
			[new_note.get_wrapper(), note_killer],
			this.notes_array.length
		);

		MathJax.Hub.Queue([
			"Typeset",
			MathJax.Hub,
			new_note.get_display().get()
		]);

		var entry = {
			'note':new_note,
		   	'killer':note_killer,
		   	'list_row':list_row
		};

		this.notes_array.push(entry);
		var note_view_id = this.inc();
		this.notes_map[note_view_id] = this.notes_array.length-1;

		this.bind_events_note(new_note, note_id, note_view_id);
		this.bind_events_killer(note_killer, note_id, note_view_id);
	}

	this.add_notes = function(note_data) {
		for(var i=0; i<note_data.length; i++) {
			this.add_note(note_data[i]);
		}
	}

	this.inc = function() {
		this.note_id_inc += 1;
		return this.note_id_inc - 1;
	};

	this.make_new_note = function(text) {
		var new_note_wrapper = $('<div />');
		var new_note_editable = new EditableText({
			'text': text,
		   	'wrapper': new_note_wrapper, 
			'width': this.note_width
		});
		return new_note_editable;
	}

	this.init();
}

