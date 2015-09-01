$(window).resize(function() {
	var navHeight = $(".navigation").height();
	var totalHeight = $(window).height() - navHeight;
	$('.sidebar').css('height', totalHeight);
  
});

var navHeight = $(".navigation").height();
var totalHeight = $(window).height() - navHeight;
$('.sidebar').css('height', totalHeight);


