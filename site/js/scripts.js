
/* add window height as min-height to all pages and splitters*/
var resizzer = function(){
  var windowHeight = $(window).height();
  var splitHeight = Math.floor(windowHeight/5);

  $('.row').css({'min-height' : windowHeight + 'px'});
  $('.split-horizontal').css({'min-height' : windowHeight + 'px' });
  $('.split-vertical').css({'min-height' : splitHeight + 'px' });
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

