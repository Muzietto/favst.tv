
var responsive_viewport = $(window).width();

/* add window height as min-height to all pages and splitters*/
$(function(){
    $('.page').css({'min-height':(($(window).height()))+'px'});
    $('.split').css({'min-height':(($(window).height()))+'px'});

    $(window).resize(function(){
    $('.page').css({'min-height':(($(window).height()))+'px'});
    $('.split').css({'min-height':(($(window).height()))+'px'});
    });
});

/* add document height as min-height to all columns*/
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
/*don't add if it's on a touch device*/
}	
else {$(function(){
    $('.column').css({'min-height':(($(document).height()))+'px'});
});
}


    
/*BACK BUTTON*/
function goBack()
  {
  window.history.back()
  }



/*NEXT BUTTON*/

$(".next").on("click", function(e) {
    container = $(this).parent();

    // am I the last .container in my group?
    while (document != container[0] && container.find('~.page, ~:has(.next-item)').length == 0)
        container = container.parent(); // if so, search siblings of parent instead

    nextdiv = container.nextAll('.next-item, :has(.next-item)').first();
    
    // no next .container found, go back to first container
    if (nextdiv.length==0) nextdiv = $(document).find('.next-item:first');
    
    //$(document).scrollTop(nextdiv.offset().top);
    $('html, body').animate({scrollTop:nextdiv.offset().top},600);
    // $(this).parent().next() // this is the next div container.
    return false;
});



/*TOGGLE MOBILE MENU*/
    
$("#menu-button").click(function() {
    $("#menu").toggleClass('open');
});
 
$(".menu-item").click(function() {
    $("#menu").removeClass('open');
});



/*SCROLL TO NEAREST CONTENT ON RESIZE to prevent strange positioning*/

var items = $(".snap");
var animating = false;

$(window).resize(function() {
    clearTimeout($.data(this, 'scrollTimer'));
    if (!animating) {
        $.data(this, 'scrollTimer', setTimeout(function() {
            items.each(function(key, value) {
                if ($(value).offset().left > $(window).scrollLeft()) {
                    animating = true;
                    $('html, body').animate( { scrollLeft: $(value).offset().left + 'px' }, 250);
                    setTimeout(function() { animating = false; }, 300);
                    return false;
                }
            });
        }, 200));
    }
});



/*LOADING DIV FADE OUT ON PAGE LOAD*/
$(document).ready(function() {
   window.setTimeout("fadeLoad();", 300);
 }
)

function fadeLoad() {
   $("#loader").hide();
}




/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
*/
(function(w){
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ){ return; }
    var doc = w.document;
    if( !doc.querySelector ){ return; }
    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x, y, z, aig;
    if( !meta ){ return; }
    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true; }
    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false; }
    function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
		// If portrait orientation and in one of the danger zones
        if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){ disableZoom(); } }
		else if( !enabled ){ restoreZoom(); } }
	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );
})( this );