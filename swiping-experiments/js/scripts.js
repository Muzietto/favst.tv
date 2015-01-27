
/* add window height as min-height to all pages and splitters*/
var resizzer = function(){
  
  var multiplier = (Modernizr.touch ? 0.91 : 1)
  
  var windowHeight = Math.floor($(window).height() * multiplier);
  var splitHeight = Math.floor(windowHeight/5);

  $('.row').css({'min-height' : windowHeight + 'px'});
  $('.split-vertical').css({'min-height' : windowHeight + 'px' });
  $('.split-horizontal').css({'min-height' : splitHeight + 'px' });
};


var horizontalScroller = function(backwards) {
  return findTargetDiv('next-item-right', backwards);  
}
var verticalScroller = function(backwards) {
  return findTargetDiv('next-item-bottom', backwards);  
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
    //alert($nextContainer.attr('id'));
    
    var scrollObject = { 
        scrollTop: $nextContainer.offset().top, 
        scrollLeft: $nextContainer.offset().left 
      };

    $('html, body').animate(scrollObject, timeLapse);
    return false;  
  }
}

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

$('.next-item-bottom')
  .prepend($('<div"/>', {class:'absolute w100pc'})
    .append($('<a/>', {class:'scroll-up', text:'go UP'}))
  );
  /*
$('.next-item-bottom')
  .append($('<div/>', {class:'absolute left w12pc'})
    .append($('<a/>', {class:'scroll-left', text:'go LEFT'}))
  );
$('.next-item-bottom')
  .append($('<div/>', {class:'absolute right w12pc'})
    .append($('<a/>', {class:'scroll-right', text:'go RIGHT'}))
  );*/
$('.next-item-bottom')
  .append($('<div/>', {class:'absolute bottom w100pc'})
    .append($('<a/>', {class:'scroll-down', text:'go DOWN'}))
  );

$(document).ready(function() {
  
  $('.scroll-down').click(verticalScroller()); //findNextVerticalContainer)
  $('.scroll-up').click(verticalScroller(true)); //findPreviousVerticalContainer)

  $('.next-item-right').hammer().bind('swipeleft', horizontalScroller()); //findNextHorizontalContainer)
  $('.next-item-right').hammer().bind('swiperight', horizontalScroller(true)); //findPreviousHorizontalContainer)
  
  });



