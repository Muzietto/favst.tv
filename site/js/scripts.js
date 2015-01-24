
/* add window height as min-height to all pages and splitters*/
var resizzer = function(){
  
  var multiplier = (Modernizr.touch ? 0.91 : 1)
  
  var windowHeight = Math.floor($(window).height() * multiplier);
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
  var extremity = (backwards ? 'last' : 'first');
  var allSelectorString = '.next-item-' + direction + ', :has(.next-item-' + direction + ')';
  var tildedSelectorString = '~.next-item-' + direction + ', ~:has(.next-item-' + direction + ')';
  var singleSelectorString = '.next-item-' + direction + ':' + extremity;
  return function(e) {
      var container = $(this);

      // am I the last .next-item in my group?
      while (document != container[0] && container.find(tildedSelectorString).length === 0) {
          container = container.parent(); // if so, search siblings of parent instead
      }

      var methodName = !backwards ? 'nextAll' : 'prevAll';
      // previous/following siblings of $(this)
      nextdiv = container[methodName](allSelectorString)[extremity]();
      
      // no next .container found, go back to first/last container
      if (nextdiv.length === 0) {
        nextdiv = $(document).find(singleSelectorString);
      }


      //alert(nextdiv.attr('id'));
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

$('.next-item-bottom')
  .prepend($('<div/>', {class:'absolute w100pc'})
    .append($('<a/>', {class:'scroll-up', text:'go UP'}))
  );
$('.next-item-bottom')
  .append($('<div/>', {class:'absolute bottom w100pc'})
    .append($('<a/>', {class:'scroll-down', text:'go DOWN'}))
  );

$(document).ready(function() {
  
  $('.scroll-down').on('click', verticalSwiper());
  $('.scroll-up').on('click', verticalSwiper(true));

  // HAMMER TIME!!!
  $('.next-item-right').hammer().bind('swipeleft', horizontalSwiper());
  $('.next-item-right').hammer().bind('swiperight', horizontalSwiper(true));
  
});



