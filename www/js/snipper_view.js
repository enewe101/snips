
function view_layout() {
	width = $(window).width();
	height = $(window).height();
	half_width = width/2 - 10;

	$('#left').css('width', half_width + 'px');
	$('#right').css('width', half_width + 'px');
	$('#keywords').css('width', half_width*0.4 + 'px');
	$('#desc').css('width', half_width*0.8 + 'px');
	$('#desc').css('height', height*0.22+ 'px');
	$('#form_area').css('padding-left', Math.max((half_width*0.1)-10,0)+ 'px');
	$('.keywords_header').css('width', (8+0.26*(width/2 - shim)) + 'px');
	$('.description_header').css('width', (8+0.74*(width/2 - shim)) + 'px');
}

