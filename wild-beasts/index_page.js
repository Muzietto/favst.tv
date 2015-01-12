/* ADD / REMOVE SELECTED CLASS TO MENU ITEMS WHEN SCROLLED TO THAT SECTION*/

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  /*don't if it's on a touch device*/
}	
else {

/*
$(window).scroll( function(){

    // The .offset() method allows us to retrieve the current position of an element relative to the document
    // .offset() returns an object {top, left}
    var newsIn = $("#news").offset().left; // 1423
    var newsOut = newsIn + $("#news").width(); // 2846
    var showsIn = $("#shows").offset().left; // 4269
    var showsOut = showsIn + $("#shows").width(); // 5692
    var discographyIn = $("#discography").offset().left;
    var discographyOut = discographyIn + $("#discography").width();
    var videosIn = $("#videos").offset().left;
    var videosOut = videosIn + $("#videos").width();
    
  ;
	if ($(window).scrollLeft() < newsIn) {
		$("#menu .home").addClass('selected');
        $("#menu .home").siblings().removeClass('selected');
    }
	else if ($(window).scrollLeft() >= newsIn &&  $(window).scrollLeft() < newsOut) {
        $("#menu .news").addClass('selected');
		$("#menu .news").siblings().removeClass('selected');
    }
	else if ($(window).scrollLeft() >= newsOut &&  $(window).scrollLeft() < showsIn) {
        $("#menu li").removeClass('selected');
    }
	else if ($(window).scrollLeft() >= showsIn &&  $(window).scrollLeft() < showsOut) {
        $("#menu .shows").addClass('selected');
		$("#menu .shows").siblings().removeClass('selected');		
    }
	else if ($(window).scrollLeft() >= showsOut &&  $(window).scrollLeft() < discographyIn) {
        $("#menu li").removeClass('selected');
    }
	else if ($(window).scrollLeft() >= discographyIn &&  $(window).scrollLeft() < discographyOut) {
        $("#menu .discography").addClass('selected');
		$("#menu .discography").siblings().removeClass('selected');
    }	 
	else if ($(window).scrollLeft() >= discographyOut &&  $(window).scrollLeft() < videosIn) {
        $("#menu li").removeClass('selected');
    }
	else if ($(window).scrollLeft() >= videosIn &&  $(window).scrollLeft() < videosOut) {
        $("#menu .videos").addClass('selected');
		$("#menu .videos").siblings().removeClass('selected');
    }
	else if ($(window).scrollLeft() >= videosOut) {
        $("#menu li").removeClass('selected');
		$('html, body').animate({
	        scrollLeft: $("#videos").offset().left
	    }, 800);
	    $('html, body').animate({
	        scrollTop: $("#videos").offset().top
	    }, 800);
    }
});

*/
}


/*SCROLLING MAIN NAVIGATION*/

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

	$("#1a").click(function() { // menu Wild Beasts
	    $('html, body').animate({ // triggers scroll event!!
	        scrollTop: $("#home").offset().top
	    }, 800);
	});
 
	$("#1b").click(function() { // menu news
	    $('html, body').animate({
	        scrollTop: $("#news").offset().top
	    }, 800);
	});

	$("#2b").click(function() { // menu shows
	    $('html, body').animate({
	        scrollTop: $("#shows").offset().top
	    }, 800);	
	});

	$("#3b").click(function() { // menu discography
	    $('html, body').animate({
	        scrollTop: $("#discography").offset().top
	    }, 800);
	});

	$("#4b").click(function() { // menu videos
	    $('html, body').animate({
	        scrollTop: $("#videos").offset().top
	    }, 800);
	});

}
else { // none of /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/

	$("#1a").click(function() { // menu Wild Beasts
	    $('html, body').animate({
	        scrollLeft: $("#home").offset().left
	    }, 800);
	    $('html, body').animate({
	        scrollTop: $("#home").offset().top
	    }, 800);
	});

	$("#1b").click(function() { // menu news
	    $('html, body').animate({
	        scrollLeft: $("#news").offset().left
	    }, 800);
	    $('html, body').animate({
	        scrollTop: $("#news").offset().top
	    }, 800);
	});

	$("#2b").click(function() { // menu shows
	    $('html, body').animate({
	        scrollLeft: $("#shows").offset().left
	    }, 800);
	    $('html, body').animate({
	        scrollTop: $("#shows").offset().top
	    }, 800);	
	});

	$("#3b").click(function() { // menu discography
	    $('html, body').animate({
	        scrollLeft: $("#discography").offset().left
	    }, 800);
	    $('html, body').animate({
	        scrollTop: $("#discography").offset().top
	    }, 800);
	});

	$("#4b").click(function() { // menu videos
	    $('html, body').animate({
	        scrollLeft: $("#videos").offset().left
	    }, 800);
	    $('html, body').animate({
	        scrollTop: $("#videos").offset().top
	    }, 800);
	});

}
