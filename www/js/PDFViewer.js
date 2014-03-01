function PDFViewer(wrapper) {

	this.page = 1;
	this.pdf = null;
	this.wrapper = wrapper;

	this.nav_toolbar = null;
	this.prev_button = null;
	this.next_button = null;
	this.canvas = null;
	this.canvas_id_inc = 0;

	this.init = function() {

		this.make_html();
		this.arm_next_and_prev_buttons();

	};


	this.make_html = function() {

//		this.nav_toolbar = $('<div id="nav_toolbar" />');
//		this.prev_button = $('<div id="prev">&lt;</div>');
//		this.next_button = $('<div id="next">&gt;</div>');
//		var clear = $('<div class="clear" />');
//		this.canvas = $('<canvas class="canvas" id="the_canvas" />');

//		this.nav_toolbar.append(this.prev_button);
//		this.nav_toolbar.append(this.next_button);
//		this.nav_toolbar.append(clear);
//
//		this.wrapper.append(this.nav_toolbar);
//		this.wrapper.append(this.canvas);

	}


	this.arm_next_and_prev_buttons = function(o) {

		return function() {
			$('#prev').on('click', function(e) {

				if(o.page == 1) {
					return;
				}
				o.page = Math.max(o.page-1, 0);
				o.pdf.getPage(o.page).then(o.render_page);

			});

			$('#next').on('click', function(e) {
				if(o.page  == o.pdf.numPages) {
					return;
				}
				o.page = Math.min(o.page+1, o.pdf.numPages);
				o.pdf.getPage(o.page).then(o.render_page);
			});
		};

	}(this);

	this.get_document = function(o){

		return function (url) {
			PDFJS.getDocument(url).then(function (pdf) {
				o.get_all_pages(pdf, 1);
			});
		};

	}(this);

	
	this.get_all_pages = function(pdf, page_num) {
		this.pdf = pdf;
		this.page = page_num;

		var canvas_id = 'canvas_' + page_num;
		var canvas = $('<canvas class="canvas" id="' + canvas_id + '" />');
		this.wrapper.append(canvas);
		var canvas = document.getElementById(canvas_id);

		pdf.getPage(page_num).then(
			function(o){
				return function (page) {
					o.render_page(page, canvas);
				}
			}(this, canvas)
		);

	};

	this.render_page = function(page, canvas) {

		var width = wrapper.width();
		var scale = width / 604;
		var viewport = page.getViewport(scale);

		var context = canvas.getContext('2d');
		canvas.height = viewport.height;
		canvas.width = Math.round(width);

		page.render({canvasContext: context, viewport: viewport});

		var next_page = this.page + 1;
		if(next_page<= this.pdf.numPages) {
			this.get_all_pages(this.pdf, next_page);
		}
	}

	this.init();
}
