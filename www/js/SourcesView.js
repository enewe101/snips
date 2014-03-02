function SourcesView(options) {

	this.wrapper = get_opt('wrapper', options, null);

	this.init = function() {
		var source_list_wrapper = $('<div id="source_list_wrapper" />');
		this.wrapper.append(source_list_wrapper);

		this.list = new List({
			'wrapper': source_list_wrapper,
			'num_cols': 5,
			'has_checks': true,
			'has_list_sep': true
		});
	};


	this.put_sources = function(sources) {
		alert(sources.toSource());
	}

	this.init();
}
