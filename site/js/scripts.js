// navigation state
var $currentPage = $('#section_1-1');

var cssToInteger = function(pxString) {
  var result = null;
  try {
    result = parseInt(pxString.substring(0,pxString.length-2));    
  } catch (err) {}
  return result;
}

/* add window height as min-height to all pages and splitters*/
var resizzer = function(e){
  var multiplier = (Modernizr.touch ? 0.91 : 1)
  
  var windowHeight = Math.floor($(window).height() * multiplier);
  var windowWidth = window.innerWidth;
  var splitMinHeight = Math.floor(windowHeight/5);

  $('.row').css({'min-height' : windowHeight + 'px'});
  $('.split-vertical').css({'min-height' : windowHeight + 'px' });
  $('.split-horizontal').css({'min-height' : splitMinHeight + 'px' });

  // temporary display - TODO: remove when site is ready
  $('.page').each(function() {
    var $this = $(this);
    var offset = $this.offset();

    var spanContent = windowWidth+'*'+windowHeight;
    spanContent += ' {top:'+ Math.floor(offset.top * 100) / 100 + ',left:'+Math.floor(offset.left * 100) / 100+'}';
    
    $('.page_size',$this).text(spanContent);
  });
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
});

/* add document height as min-height to all columns*/
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  /* find out */
}	
else {
  $(document).ready(function(){
    $('.column').css({'min-height':(($(document).height()))+'px'});
  });
}

var findTargetDiv = function(cssClass, backwards) {
  var firstOrLast = (backwards) ? ':last' : ':first';
  var searchMethod = (backwards) ? 'prevAll' : 'nextAll';
  return function(e) {
    var timeLapse = 600;
    
    var $container = ($(this).hasClass(cssClass)) ? $(this) : $(this).parents('.' + cssClass);
    var $nextContainer = $container[searchMethod]('.'+cssClass+':first');
    if ($nextContainer.length===0) {
      timeLapse = 150;
      $nextContainer = $container.parent().find('.'+cssClass+firstOrLast);
    }

    // set navigation state
    $currentPage = $nextContainer;
    
    var scrollObject = { 
        scrollTop: $nextContainer.offset().top, 
        scrollLeft: $nextContainer.offset().left 
      };

    $('html, body').animate(scrollObject, timeLapse);
    return false;  
  }
}

var horizontalScroller = function(backwards) {
  return findTargetDiv('next-item-right', backwards);  
}
var verticalScroller = function(backwards) {
  return findTargetDiv('next-item-bottom', backwards);  
}

// click handler for .page
var pageScroller = function() {
  var offset = $(this).offset();
  window.scrollTo(offset.left,offset.top);
  return false;
}

$('.next-item-bottom')
  .prepend($('<div/>', {class:'absolute w100pc'})
    .append($('<a/>', {class:'scroll-up', text:'\u25b2'}))
  );
$('.next-item-bottom')
  .append($('<div/>', {class:'absolute bottom w100pc'})
    .append($('<a/>', {class:'scroll-down', text:'\u25bc'}))
  );

$(document).ready(function() {
  
  $('.scroll-down').click(verticalScroller()); //findNextVerticalContainer)
  $('.scroll-up').click(verticalScroller(true)); //findPreviousVerticalContainer)

  // HAMMER TIME!!!
  $('.next-item-right').hammer().bind('swipeleft', horizontalScroller()); //findNextHorizontalContainer)
  $('.next-item-right').hammer().bind('swiperight', horizontalScroller(true)); //findPreviousHorizontalContainer)
  
});



