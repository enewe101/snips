function CopyButton(options) {

	this.wrapper = get_opt('wrapper', options, null);
	this.button_text = get_opt('button_text', options, 'copy');
	this.target = null;

	// validation
	if(!(this.wrapper instanceof jQuery && debug)) {
		alert('CopyButten(options) expects a jQuery as options["wrapper"], '
			+ 'got ' + typeof(this.wrapper) + '(' + this.wrapper + ')');
	}
	if(!(typeof(this.button_text) == 'string')) {
		alert('CopyButten(options) expects a string as options["button_text"],'
			+ ' got ' +typeof(this.button_text) +'(' +this.button_text + ')');
	}


	this.init = function() {
		this.button = $('<input type="button" value="' 
			+ this.button_text + '" />');
		this.wrapper.append(this.button);

		this.arm_button();
	};

	this.arm_button = function(o) {
		return function() {
			this.button.click(function() {
				o.on_click();
			});
		};
	}(this);

	this.on_click = function() {
		if(this.target != null) {
			if(!(typeof(this.target.val)=='function') && debug) {
				alert('CopyButton.target should have a val() function, but '
					+ 'none was found');
			}
			alert(this.target.val());
		} else {
			alert('CopyButton: No target bound!');
		}
	};

	this.set_target = function(target) {
		this.target = target;

		// validation
		if(!typeof(this.target) == 'string') {
			alert('CopyButton.set_target(target) expects a jQuery matching a '
				+ 'single input element as target, got ' 
				+ typeof(this.target) + '(' + this.target + ')');
		}

	}

	this.init();

}

