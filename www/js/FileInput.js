//
//	Makes a nicer input for user file uploads
//
//	# No Inputs #
//	
//	# Returns #
//		A file input object.  
//
//	Usage
//		var file_input = new FileInput;
//		var element = file_input.get_wrapper();
//		$('#existing_div).append(element);
//

function FileInput(options) {

	this.name = get_opt('name', options, null);

	this.init = function() {
		this.build_html();
		this.arm_events();
	};

	this.arm_events = function() {
		this.arm_browse_click();
		this.arm_input_change();
		this.arm_kill_click();
		this.arm_input_wrapper_hover();
	};


	this.arm_browse_click = function() {
		this.input_label.click(function(o) {
			return function(e) {
				if (navigator.userAgent.toLowerCase().indexOf('mozilla')>=0) {
					e.preventDefault();
					o.input.click();
				}
			};
		}(this));
	};


	this.arm_kill_click = function() {
		this.file_kill.click(function(o) {
			return function(e) {
				var new_file_input = $('<input type="file" />');
				new_file_input.attr('id', 'file_input')
					.attr('class', 'form_file_hidden');
				o.file_hidden.html(new_file_input);
				o.input_label.text('browse for file... ');
				o.input = new_file_input;
				o.arm_input_change();
			};
		}(this)); 
	};


	this.arm_input_change = function() {
		this.input.change(function(o) {
			return function(e) {
				var fname = $(this).val().split(/[\/\\]/).pop();
				o.input_label.text(fname);
			};
		}(this));
	};

	this.arm_input_wrapper_hover = function() {
		this.wrapper.hover(
			function (o) {
				return function(){
					o.file_kill.addClass('file_kill_hover');
					o.file_kill.removeClass('file_kill');
				
				};
			}(this),
			function (o) {
				return function() {
					o.file_kill.addClass('file_kill');
					o.file_kill.removeClass('file_kill_hover');
				};
			}(this)
		);
	};

	this.build_html = function() {
		this.wrapper = $('<div  />');
		this.wrapper.attr('id', 'statement_file')
			.attr('class', 'file_input_control_wrapper');

		this.input_label = $('<label ></label>');
		this.input_label.attr('class', 'form_file_normal')
			.attr('for', 'statement_file')
			.text('browse for file...');


		this.file_kill = $('<div class="file_kill" />');
		this.file_hidden = $('<div class="form_file_hidden" />');

		this.input = $('<input  type="file"/>')
			.attr('name', this.name)
			.attr('id', 'file_input')
			.attr('class', 'form_file_hidden');


		this.file_hidden.append(this.input);
		this.wrapper.append(this.input_label);
		this.wrapper.append(this.file_kill);
		this.wrapper.append(this.file_hidden);
		this.wrapper.append($('<div class="clear" />'));

	}

	this.val = function(value) {
		if(typeof(value) != 'undefined') {
			this.file_kill.click()
		} else {
			return this.input.val();
		}
	};

	this.get_wrapper = function() {
		return this.wrapper;
	};

	this.init();
}

