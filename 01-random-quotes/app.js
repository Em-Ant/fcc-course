$(document).ready(function() {
     
  /* function that gets a new quote form STANDS4 and configures the tweet btn */
  var new_quote = function() {
    $('#new').attr('disabled','disabled');
    $('#twt').attr('disabled','disabled');
    $("#quote-area div").slideUp(500,function(){$('.loader').fadeIn();}).addClass('dead');
    var $div;
    var q = $.ajax({
      url : "http://www.stands4.com/services/v2/quotes.php?uid=4203&tokenid=WlHjiz0FePRFOxH1&searchtype=RANDOM",
      success: function(){          
        $div = $("<div></div>");
        var $xml = $($.parseXML(q.responseText));   
        $div.hide();
        $('.dead').remove();
        var quote = $xml.find("quote").text();
        var author = $xml.find("author").text()
        $div.append($('<h3 class="quote"></h3>').text('"'+quote+'"'));
        $div.append($('<h4 class="auth"></h4>').text("- "+author));
        $("#quote-area").append($div);
        var tw_quote;     
        // slice quote string for twitter
        if (quote.length > 125-author.length){
          tw_quote = quote.slice(0,122-author.length) +"...";
          console.log(tw_quote);
        }
         else
           tw_quote = quote;
        $('#twt').attr('href','https://twitter.com/intent/tweet?text='+encodeURIComponent(tw_quote+"["+author+"]")+"%20%23RandomQuote");
        $('#new').removeAttr('disabled');
        $('#twt').removeAttr('disabled');
        $('.loader').fadeOut(function(){$div.slideDown(500);});
        },
      error: function(){
        $div = $("<div></div>");
        $div.hide();
        $('.dead').remove();
        $div.append($("<h3></h3>").text("Connection Error !"));
        $('#twt').attr('href','https://twitter.com/intent/tweet?text=%20%23RandomQuote'); 
        $('#new').removeAttr('disabled');
        $('#twt').removeAttr('disabled');
        $('.loader').fadeOut(function(){$div.slideDown(500);});     
      }
    })
  };
  
  /* Bind click event on main btn, and load the first quote */
  $("#new").click(new_quote);
  $('.loader').fadeIn();
  new_quote();
});
