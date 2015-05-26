// navigation state
var $currentPage = $('.home_page');

var cssToInteger = function(pxString) {
  var result = null;
  try {
    result = parseInt(pxString.substring(0, pxString.length - 2));    
  } catch (err) {}
  return result;
}

/* add window height as min-height to all pages and splitters */
var resizzer = function(e){
  var multiplier = (Modernizr.touch ? 0.91 : 1)
  
  var windowHeight = Math.floor($(window).height() * multiplier);
  var windowWidth = window.innerWidth;
  var splitMinHeight = Math.floor(windowHeight / 5);

  $('.row').css({'min-height' : windowHeight + 'px'});
  $('.split-vertical').css({'min-height' : (3 * windowHeight + 2 * splitMinHeight) + 'px' });
  $('.split-horizontal').css({'min-height' : splitMinHeight + 'px' });

  // temporary display - TODO: remove when site is ready
  /*
  $('.page').each(function() {
    var $this = $(this);
    var offset = $this.offset();

    var spanContent = windowWidth + '*' + windowHeight;
    spanContent += ' {top:'+ Math.floor(offset.top * 100) / 100 + ',left:' + Math.floor(offset.left * 100) / 100 + '}';
    
    $('.page_size', $this).text(spanContent);
  });
  */
  return false;
};

// http://stackoverflow.com/questions/5489946/jquery-how-to-wait-for-the-end-of-resize-event-and-only-then-perform-an-ac/5490021#5490021
var resizing;
function resizedw(){
  var offset = $currentPage.offset();
  window.scrollTo(offset.left,offset.top);
  return false;
}

window.onresize = function() {
  clearTimeout(resizing);
  resizing = setTimeout(resizedw, 100);
};

$(document).ready(function(){
  $(window).resize(resizzer);
  resizzer();

  // find homepage
  setTimeout(function() {
    $('html,body').animate({
      scrollTop: $('.home_page').offset().top,
      scrollLeft: $('.home_page').offset().left
    }, 100);
    return false;
  },5);
});

/* add document height as min-height to all columns*/
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  /* find out */
}	
else {
  $(document).ready(function(){
    $('.column').css({'min-height': (($(document).height())) + 'px'});
  });
}

var findTargetDiv = function(cssClass, backwards) {
  var firstOrLast = (backwards) ? ':last' : ':first';
  var searchMethod = (backwards) ? 'prevAll' : 'nextAll';

  return function(e) {
    //debugger;
    var timeLapse = 1200;
    
    var $container = ($(this).hasClass(cssClass)) ? $(this) : $(this).parents('.' + cssClass);
    var $nextContainer = $container[searchMethod]('.' + cssClass + ':first');
    if ($nextContainer.length === 0) {
      timeLapse = 150;
      $nextContainer = $container.parent().find('.' + cssClass + firstOrLast);
    }

    // stop all players
    // ref: http://9bugs.in/pause-youtube-video-within-iframe-using-external-button-click-in-javascript-or-jquery-268
    $('.youtube_player_iframe').each(function(){
      this.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*')
    });

    // set navigation state
    $currentPage = $nextContainer;
    
    var scrollObject = { 
        scrollTop: $nextContainer.offset().top, 
        scrollLeft: $nextContainer.offset().left 
      };

    $('html, body').animate(scrollObject, timeLapse, function(){
      // adjust url hash in page history
      setTimeout(function(){
        location.hash = $currentPage.prop('id');
      },5);
    });
  }
}

var horizontalScroller = function(backwards) {
  return findTargetDiv('next-item-right', backwards);  
}
var verticalScroller = function(backwards) {
  return findTargetDiv('next-item-bottom', backwards);  
}

// click handler for .page and .home_page_site_nav
var pageScroller = function($targetDiv) {
  //debugger;
  $nextContainer = $targetDiv || $(this);
  $currentPage = $nextContainer;

  var scrollObject = { 
      scrollTop: $nextContainer.offset().top, 
      scrollLeft: $nextContainer.offset().left 
    };
  $('html, body').animate(scrollObject, 1200, function(){
    // adjust url hash in page history
    setTimeout(function(){
      location.hash = $currentPage.prop('id');
    },5);
  });
}

$(document).ready(function() {
  // REMOVE WIP-RELATED INFORMATION
  $('span.page_name').hide();

  $('.nav_arrow_up')
    .prepend($('<div/>', {class:'absolute w100pc'})
      .append($('<a/>', {class:'scroll-up', text:'\u25b2'}))
    );

  $('.nav_arrow_left')
    .append($('<div/>', {class:'absolute left-arrow'})
      .append($('<a/>', {class:'scroll-left', text:'\u25c0'}))
    );

  $('.nav_arrow_right')
    .append($('<div/>', {class:'absolute right-arrow'})
      .append($('<a/>', {class:'scroll-right', text:'\u25b6'}))
    );
    
  $('.nav_arrow_down')
    .append($('<div/>', {class:'absolute bottom w100pc'})
      .append($('<a/>', {class:'scroll-down', text:'\u25bc'}))
    );
  
  $('.scroll-down').click(verticalScroller()); //findNextVerticalContainer)
  $('.scroll-up').click(verticalScroller(true)); //findPreviousVerticalContainer)
  $('a.scroll-right').bind('click', horizontalScroller()); //findNextHorizontalContainer)
  $('a.scroll-left').bind('click', horizontalScroller(true)); //findPreviousHorizontalContainer)

  // HAMMER TIME!!!
  $('.next-item-right').hammer().bind('swipeleft', horizontalScroller()); //findNextHorizontalContainer)
  $('.next-item-right').hammer().bind('swiperight', horizontalScroller(true)); //findPreviousHorizontalContainer)

  /*
  $('.home_page_site_nav li.video_item').click(function(){ pageScroller($('section.video_1')); });
  $('.home_page_site_nav li.music_item').click(function(){ pageScroller($('section.music_1')); });
  $('.home_page_site_nav li.business_item').click(function(){ pageScroller($('section.business_1')); });
  $('.home_page_site_nav li.bio_item').click(function(){ pageScroller($('section.bio_1')); });
*/
});



