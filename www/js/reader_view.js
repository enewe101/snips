window.onload = init;
var page = 1;
var clip_id_inc = 1;
var pdf_viewer;
var notes_viewer;
var bib_code_display;

function init() {

	var middle = $('#middle');
	var right = $('<div id="right" />');
	var left  = $('<div id="left" />');
	var  pdf_wrapper = $('<div id="pdf_view_wrapper" />');
	var  notes_wrapper = $('<div id="notes_wrapper" />');

	right.append(pdf_wrapper);


	// quickly add a widget to show the bibcode
	bib_code_display = $('<input id="bib_code_display" type="text"/>');
	var bib_code_wrapper = $('<div id="bib_code" />');
	var bib_code_button = new CopyButton({'wrapper':bib_code_wrapper});
	bib_code_button.set_target(bib_code_display);

	bib_code_update_button = $('<input type="button" value="update" />');
	bib_code_update_button.click(function() {
		update_source_bib_code(
			{
				"id":source_id,
				"bib_code":bib_code_display.val()
			},
			on_updated_bib_code
		);
	});

	var bib_code_updated_icon = $('<span id="bib_code_updated_icon">');

	left.append(bib_code_display);
	left.append(bib_code_update_button);
	left.append(bib_code_updated_icon);
	left.append(bib_code_wrapper);

	left.append($('<h2>Notes</h2>'));
	left.append(notes_wrapper);
	middle.append(right);
	middle.append(left);

	var full_width = $(document).width();
	var full_height = $(document).height();
	var right_width = full_width*(3.0/4.0);
	var left_width = full_width - right_width - 40;

	$('#right').css('width', right_width + 'px')
		.css('height', full_height + 'px');
	$('#pdf_view_wrapper').css('width', (right_width-12) + 'px');

	$('#left').css('width', left_width + 'px')
		.css('height', full_height + 'px')
		.css('float', 'left');
	$('#notes_wrapper').css('width', (left_width-42) + 'px');

	pdf_viewer = new PDFViewer($('#pdf_view_wrapper'));
	notes_viewer = new NotesViewer(
		{'wrapper':$('#notes_wrapper'), 'note_width': (left_width-74) + 'px'},
		2
	);

	notes_viewer.set_handlers({
		'save': function(desc, callback, backlink) {
				save_snip({
					'desc': desc, 
					'source_id': source_id
				},
				callback, backlink); 
			},
		'del': function(snip_id, callback, backlink) {
				delete_snip({'id':snip_id}, callback, backlink);	
			},
		'update': function(snip_id, desc, callback, backlink) {
				update_snip({
					'id':snip_id,
			   		'desc': desc,
					'source_id': source_id
				},
				callback, backlink);
			},
	});

	get_source(source_id, on_get_source);
	get_snips(source_id, on_get_snips);
	
}

function on_updated_bib_code(data) {
	$('#bib_code_updated_icon').text('updated!');
}

function on_get_source(data) {
	data = data[0];
	bib_code_display.val(data['bib_code']);

	var url = 'pdfs/' + data['path'];
	pdf_viewer.get_document(url); 
}

function on_get_snips(data) {
	notes_viewer.add_notes(data);
}

