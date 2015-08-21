$(document).ready(function(){
  $('#portfolio .thumbnail').hover(function(){
    $(this).children(".cust-caption").slideDown();
  },
  function(){
    $(this).children(".cust-caption").fadeOut();
  });
});

// strict just to keep concept of bootstrap
+function ($) {
  'use strict';


// spy and scroll menu boogey
$("#navbar ul li a[href^='#']").on('click', function(e) {

   // prevent default anchor click behavior
   e.preventDefault()

   // store hash
   var hash = this.hash

   // animate
   $('html, body').animate({
       scrollTop: $(this.hash).offset().top 
     }, 500, function(){
       window.location.hash = hash 
     })

})

}(jQuery);
