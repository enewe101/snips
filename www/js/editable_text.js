function EditableText(options) {

	this.wrapper = get_opt('wrapper', options, null);
	this.width = get_opt('width', options, '60px');
	this.height = get_opt('height', options, null);
	this.empty_text = get_opt('empty_text', options, '');
	var text = get_opt('text', options, '');

	this.input = $('<textarea />');
	this.display = $('<div class="edit_display" />');
	this.wrapper.append(this.input);
	this.wrapper.append(this.display);

	this.input.val(text);
	this.input.css('width', this.width);
	this.display.css('width', this.width);
	if(this.height) {
		this.input.css('height', this.height);
		this.display.css('height', this.height);
	}

	this.input.css('display', 'none')

	this.is_focused = false;

	this.hoverin = function(o) {
		return function() {
			o.display.attr('class', 'edit_display_hover');
		};
	}(this);

	this.hoverout = function(o) {
		return function() {
			o.display.attr('class', 'edit_display');
		};
	}(this);

	this.on_click = function(o) {
		return function() {
			o.focus();
		}
	}(this);

	this.on_focus = function(o) {
		return function() {
			o.is_focused = true;
			o.display.css('display', 'none');
			o.input.css('display', 'block');
		}
	}(this);

	this.blur = function(o) {
		return function() {
			o.is_focused = false;
			o.display.css('display', 'block');
			o.input.css('display', 'none');
			o.update_display();
		}
	}(this);

	this.val = function(text) {
		this.input.val(text);
		this.update_display();
	};

	this.update_display = function() {
		var text = this.input.val().trim();
		if (text == '') {
			this.display.html('<span class="empty_text">' + 
				this.empty_text + '</span>');

		} else {
			this.display.text(text);
		}
	};
	this.focus = function() {
		this.display.css('display', 'none');
		this.input.css('display', 'block');
		this.is_focused = true;
		this.input.focus();
	};

	this.change = function(o) {
		return function() {
			o.update_display();
		}
	}(this);

	this.get_wrapper = function() {
		return this.wrapper;
	};

	this.get_input = function() {
		return this.input;
	};

	this.get_display = function() {
		return this.display;
	};

	this.wrapper.hover(this.hoverin, this.hoverout);
	this.display.click(this.on_click);
	this.input.focus(this.on_focus);
	this.input.blur(this.blur);
	this.input.change(this.change);
	this.update_display();

}
