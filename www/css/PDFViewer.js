function PDFViewer(wrapper) {

	this.page = 1;
	this.pdf = null;
	this.wrapper = wrapper;

	this.nav_toolbar = null;
	this.prev_button = null;
	this.next_button = null;
	this.canvas = null;

	this.init = function() {

		this.make_html();
		this.arm_next_and_prev_buttons();

	};


	this.make_html = function() {

		this.nav_toolbar = $('<div id="nav_toolbar" />');
		this.prev_button = $('<div id="prev">&lt;</div>');
		this.next_button = $('<div id="next">&gt;</div>');
		var clear = $('<div class="clear" />');
		this.canvas = $('<canvas id="the-canvas" />');

		this.nav_toolbar.append(this.prev_button);
		this.nav_toolbar.append(this.next_button);
		this.nav_toolbar.append(clear);

		this.wrapper.append(this.nav_toolbar);
		this.wrapper.append(this.canvas);

	}


	this.arm_next_and_prev_buttons = function(o) {

		return function() {
			$('#prev').on('click', function(e) {

				if(o.page == 1) {
					return;
				}
				o.page = Math.max(o.page-1, 0);
				o.pdf.getPage(o.page).then(o.get_page);

			});

			$('#next').on('click', function(e) {
				if(o.page  == o.pdf.numPages) {
					return;
				}
				o.page = Math.min(o.page+1, o.pdf.numPages);
				o.pdf.getPage(o.page).then(o.get_page);
			});
		};

	}(this);

	this.get_document = function(o){

		return function (url) {
			PDFJS.getDocument(url).then(function (pdf) {
				pdf.getPage(o.page).then(o.get_page);
				o.pdf = pdf;
			});
		};

	}(this);

	this.get_page = function(page) {

		var width = $(window).width();
		var scale = width / 1218;
		var viewport = page.getViewport(scale);

		var canvas = document.getElementById('the-canvas');
		var context = canvas.getContext('2d');
		canvas.height = viewport.height;
		canvas.width = Math.round(width/2 - 16);

		//
		// Render PDF page into canvas context
		//
		page.render({canvasContext: context, viewport: viewport});
	}

	this.init();
}
