
var cssToInteger = function(pxString) {
  var result = null;
  try {
    result = parseInt(pxString.substring(0,pxString.length-2));    
  } catch (err) {}
  return result;
}

/* add window height as min-height to all pages and splitters*/
var resizzer = function(){
  
  var multiplier = (Modernizr.touch ? 0.91 : 1)
  
  var windowHeight = Math.floor($(window).height() * multiplier);
  var windowWidth = window.innerWidth;
  var splitMinHeight = Math.floor(windowHeight/5);
  
  var splitHeight = cssToInteger($('.split-horizontal').css('height'));
  var splitWidth = cssToInteger($('.split-vertical').css('width'));

  $('.row').css({'min-height' : windowHeight + 'px'});
  $('.split-vertical').css({'min-height' : windowHeight + 'px' });
  $('.split-horizontal').css({'min-height' : splitMinHeight + 'px' });
  
  $('.page').each(function() {
    var $this = $(this);
    // page id e.g. 'section_2-1'
    var colRow = $this.attr('id').split('_')[1].split('-'); // [col,row]
    var colIndex = parseInt(colRow[0]);
    var rowIndex = parseInt(colRow[1]);

    var offsetLeft = (colIndex - 1) * windowWidth + ((colIndex > 1) ? (colIndex - 2) * splitWidth : 0);
    var offsetTop = (rowIndex - 1) * windowHeight + ((rowIndex > 1) ? (rowIndex - 2) * splitHeight : 0);
    $this.offset({'top':offsetLeft,'left':offsetTop});
    
    var offset = $this.offset();
    
    var spanContent = windowWidth+'*'+windowHeight;
    spanContent += ' {top:'+ Math.floor(offset.top * 100) / 100 + ',left:'+Math.floor(offset.left * 100) / 100+'}';
    
    $('.page_size',$this).text(spanContent);
  });
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
    //alert($nextContainer.attr('id'));
    
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

$('.next-item-bottom')
  .prepend($('<div/>', {class:'absolute w100pc'})
    .append($('<a/>', {class:'scroll-up', text:'go UP'}))
  );
$('.next-item-bottom')
  .append($('<div/>', {class:'absolute bottom w100pc'})
    .append($('<a/>', {class:'scroll-down', text:'go DOWN'}))
  );

$(document).ready(function() {
  
  $('.scroll-down').click(verticalScroller()); //findNextVerticalContainer)
  $('.scroll-up').click(verticalScroller(true)); //findPreviousVerticalContainer)

  // HAMMER TIME!!!
  $('.next-item-right').hammer().bind('swipeleft', horizontalScroller()); //findNextHorizontalContainer)
  $('.next-item-right').hammer().bind('swiperight', horizontalScroller(true)); //findPreviousHorizontalContainer)
  
});



