//	Used to place vertically aligned elements on a page, somewhat like a 
//	table, but with a bit more more flexibility.
//
//	Basic usage:
//	============
//	1) 	Bulid a new list object:
//
//			var my_list = new List(specification);
//
//		Where:
//		specification := {
//			'wrapper' : <jQuery>,		// i.e. html element gotten with $()
//			'num_cols' : <number>, 		// number of colums per list row
//			'has_checks': <bool>,		// include checkboxes on each row
//			'has_list_sep': <bool>,		// include separator elements 
//		}
//
//	2) Add stuff to it
//
//			my_list.add_item(contents);
//				(or) 	
//			my_list.add_items([contents, contents, ...])
//
//		Where:
//		contents := [item, item...]; and
//		item := <string> | <jQuery> 
//

function List(options) {
// All args passed in an options object

	// Required 
	this.wrapper = get_opt('wrapper', options, null);
	this.num_cols = get_opt('num_cols', options, null);

	// Optional
	this.has_checks = get_opt('has_checks', options, false);
	this.has_list_sep = get_opt('has_list_sep', options, false);

	// State
	this.items = [];
	this.header_items = [];
	this.table;

	// Validations
	if(!this.wrapper instanceof jQuery) {
		alert('List(options) expects options.wrapper to be a jQuery');
	}


	this.init = function() {
		this.table = $('<table class="list_table" />');
		this.wrapper.append(this.table);
	};

	this.remove = function(index) {
		var item_to_remove = this.items[index];
		item_to_remove.remove();
		this.items.splice(index, 1);
	};


	this.add_items = function(content_rows, are_headers) {

		// loop variables
		var first = true;
		var start;
		var finish;
		var added_rows = [];

		// add each row of content
		for(var i=0; i<content_rows.length; i++) {
				added_rows.push(this.add_item(content_rows[i], are_headers));
		}

		// return the index of the first and last row added
		return added_rows;
	};


	this.add_item = function(content_row, is_header) {
		try {
			var splice_index = (
				is_header? this.header_items.length : this.items.length);
			return this.add_item_at(content_row, splice_index, is_header);
		} catch(e) {
			alert(e);
		}
	};


	this.add_item_at = function(content_row, index, is_header) {

		is_header = Boolean(is_header);

		// validation
		var valid_length = (is_header?  
			this.header_items.length : this.items.length);

		if(debug && (index > valid_length || index < 0)) {
			alert('index out of range in List.add_item_at(): ' + index);
		}
		if(!$.isArray(content_row) && debug) {
			alert('non array passed to List.add_item(): \n' 
				+ content_row.toSource());
		}

		var new_row = (is_header?
			$('<tr class="list_header" />') : $('<tr class="list_row" />'));
		var new_row_elms = {'wrapper': new_row};
		var first = true;

		// add checkboxes if its that kind of list
		if(this.has_checks){
			
			// Checkboxes only actually get added to non-header rows
			if(!is_header) {
				var check = $('<input type="checkbox" />');
				var check_wrap = $('<td class="list_elm" />');
				check_wrap.append(check);
				new_row.append(check_wrap);
				first = false;
				new_row_elms['check'] = check;

			// For header rows, add a spacer
			} else {
				var check = $('<span>&nbsp;</span>');
				var check_wrap = $('<td class="list_elm" />');
				check_wrap.append(check);
				new_row.append(check_wrap);
				first = false;
				new_row_elms['check'] = check;
			}
		}

		// add each piece of content for the row
		new_row_elms['elms'] = [];
		for(var i=0; i<this.num_cols; i++) {

			// add vertical separators between elements on a row
			if(!first) {
				var new_sep = $('<td class="list_sep" />');
				new_row.append(new_sep);
			}

			var new_elm = $('<td class="list_elm">');
			var content = content_row[i];
			if(typeof(content) == 'undefined') {
				alert('i:'+i);
				alert('length:'+this.items.length);
				alert('is_header:'+is_header);
			}
			
			if(content instanceof jQuery) {
				new_elm.append(content);

			} else if(typeof(content)=='string') {
				if(content.trim() == '') {
					new_elm.html($('<span class="no_collapse">&nbsp;</span>'));
				} else {
					new_elm.text(content);
				}

			} else if(typeof(content)=='number') {
				// cast to string
				new_elm.text('' + content);

			} else if(content === null) {
				new_elm.html($('<span class="no_collapse">&nbsp;</span>'));

			} else if(debug) {
				alert('unexpected type of content in List.add_item():\n' +
					typeof(content) + '\n' + content.toString());
			}

			new_row_elms['elms'].push(new_elm);
			new_row.append(new_elm);
		}

		// place the new row on the page
		var add_to_list = is_header? this.header_items : this.items;
		if(add_to_list.length == 0) {
			if(is_header) {
				this.table.prepend(new_row);
			} else {
				this.table.append(new_row);
			}

		} else if(index == add_to_list.length) {
			add_to_list[index-1]['wrapper'].after(new_row);

		} else {
			add_to_list[index]['wrapper'].before(new_row);
		}

		add_to_list.splice(index, 0, new_row_elms);

		return new_row_elms;
	}



	this.init();
}
