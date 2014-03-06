function KillButton(options) {
	

	this.init = function() {
		this.button_div = $('<div class="file_kill" />');
		this.arm_hover();
	};

	this.arm_hover = function(wrapper) {
		wrapper = wrapper || this.button_div;

		wrapper.hover(
			function (o) {
				return function(){
					o.button_div.addClass('file_kill_hover');
					o.button_div.removeClass('file_kill');
				
				};
			}(this),
			function (o) {
				return function() {
					o.button_div.addClass('file_kill');
					o.button_div.removeClass('file_kill_hover');
				};
			}(this)
		);

	};

	this.click = function(callback) {
		this.button_div.click(callback);
	};

	this.get = function() {
		return this.button_div;
	};

	this.init();
}
