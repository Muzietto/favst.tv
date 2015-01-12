
/* add window height as min-height to all pages and splitters*/
var resizzer = function(){
  var windowHeight = $(window).height();
  var splitHeight = Math.floor(windowHeight/5);

  $('.row').css({'min-height' : windowHeight + 'px'});
  $('.split-vertical').css({'min-height' : windowHeight + 'px' });
  $('.split-horizontal').css({'min-height' : splitHeight + 'px' });
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

// swiping function
var swiper = function(direction, scrollTarget, backwards) {
  var allSelectorString = '.next-item-' + direction + ', :has(.next-item-' + direction + ')';
  var singleSelectorString = '.next-item-' + direction + ':first';
  return function(e) {
      var $this = $(this);
      container = $this.parent();

      // am I the last .next-item in my group?
      while (document != container[0] && container.find(allSelectorString).length === 0) {
          container = container.parent(); // if so, search siblings of parent instead
      }

      var methodName = !backwards ? 'nextAll' : 'prevAll';
      // previous/following siblings of $(this)
      nextdiv = $this[methodName](allSelectorString).first();
      
      // no next .container found, go back to first container
      if (nextdiv.length === 0) {
        nextdiv = $(document).find(singleSelectorString);
      }

      var scrollObject = {};

      try {
        scrollObject = (scrollTarget==='scrollTop') ? { scrollTop:nextdiv.offset().top } : { scrollTop:nextdiv.offset().top, scrollLeft:nextdiv.offset().left };
      } catch (err) {}

      $('html, body').animate(scrollObject, 600);

      return false;
  };
};

var verticalSwiper = function(backwards) {
  return swiper('bottom','scrollTop',backwards);
}

var horizontalSwiper = function(backwards) {
  return swiper('right','scrollLeft',backwards);
}

// HAMMER TIME!!!
$('.next-item-right').hammer().bind('panleft', horizontalSwiper());
$('.next-item-right').hammer().bind('panright', horizontalSwiper(true));

$('.next-item-bottom').hammer().bind('tap', verticalSwiper());
$('.next-item-bottom').hammer().bind('press', verticalSwiper(true));





