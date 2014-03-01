function List(options) {

	this.wrapper = get_opt('wrapper', options, null);
	this.num_cols = get_opt('num_cols', options, null);
	this.has_checks = get_opt('has_checks', options, false);
	this.has_list_sep = get_opt('has_list_sep', options, false);
	this.items = [];

	this.init = function() {
		this.make_html();
	};

	this.make_html = function() {
	};


	this.remove = function(index) {
		var item_to_remove = this.items[index];
		item_to_remove.remove();
		this.items.splice(index, 1);
	};

	this.add_item = function(contents) {
		return this.add_item_at(contents, this.items.length);
	};

	this.add_item_at = function(contents, index) {

		// validation
		if(debug && (index > this.items.length || index < 0)) {
			alert('index out of range in List.add_item_at(): ' + index);
		}
		if(!$.isArray(contents) && debug) {
			alert('non array passed to List.add_item(): \n' 
				+ contents.toSource());
		}
			
		var new_row = $('<div class="list_row" />');
		var new_row_elms = {'wrapper': new_row};
		var first = true;

		// add checkboxes if its that kind of list
		if(this.has_checks){
			var check = $('<input type="checkbox" />');
			var check_wrap = $('<div class="list_elm" />');
			check_wrap.append(check);
			new_row.append(check_wrap);
			first = false;
			new_row_elms['check'] = check;
		}

		// add each piece of content for the row
		new_row_elms['elms'] = [];
		for(var i=0; i<this.num_cols; i++) {

			if(!first) {
				var new_sep = $('<div class="list_sep" />');
				new_row.append(new_sep);
			}

			var new_elm = $('<div class="list_elm">');
			var content = contents[i];
			
			if(content instanceof jQuery) {
				new_elm.append(content);

			} else if(typeof(content)=='string') {
				new_elm.text(content);

			} else if(debug) {
				alert('unexpected type of content in List.add_item():\n' +
					typeof(content) + '\n' + content.toString());
			}

			new_row_elms['elms'].push(new_elm);
			new_row.append(new_elm);
		}

		// place the new row on the page
		if(this.items.length == 0) {
			this.wrapper.append(new_row);

		} else if(index == this.items.length) {
			this.items[index-1].after(new_row);

		} else {
			this.items[index].before(new_row);
		}

		this.items.splice(index, 0, new_row);

		return new_row_elms;
	}



	this.init();
}
