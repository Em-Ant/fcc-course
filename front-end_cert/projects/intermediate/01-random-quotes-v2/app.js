/**
* -----------------------------------------------
*             RANDOM QUOTE MACHINE v2
*              for freeCodeCamp.com
* -----------------------------------------------
*
* This is the new version of the exercise.
* It uses a remote quotes service provided by
* www.forismatic.com
*
* The tricky part of this zipline is understanding
* and configure JSONP for cross domain requests.
*
* I heavily relied on promises, with the purpose of
* studying and mastering this awesome tool.
*
* For this exercise I used :
* - Bootstrap
* - JQuery
* - Twitter We Intents
* - Google Fonts
* - Font Awesome
* - A free to use image of a scroll paper,
*   edited with GIMP
*
* An old version, with simpler design,
* twitter hashtag button and a local quote archive
* is available at
* ------------------------------------------------
* ====> http://codepen.io/Em-Ant/pen/gpBxyV
* ------------------------------------------------
*/

$(document).ready(function() {

  var setLoadingState = function(){

    // I used a deferred object to wait for animations
    var deferred = $.Deferred();
    $('#new').attr('disabled','disabled');
    $('#twt').attr('disabled','disabled');
    $("#quote-area").slideUp(function(){
      $('.loader').fadeIn(function(){
        deferred.resolve();
      });
    });
    return deferred.promise();
  };

  var setQuote = function(data){
    var quote = data.quoteText;
    var author = data.quoteAuthor;
    $('#Q').text('"'+quote+'"');
    $('#A').text(author);
    var tw_quote;

    // slice quote string for twitter
    if (quote.length > 125-author.length){
      tw_quote = quote.slice(0,122-author.length) +"...";
    }
    else
      tw_quote = quote;
    $('#twt').attr('href','https://twitter.com/intent/tweet?text='+encodeURIComponent(tw_quote+"["+author+"]")+"%20%23RandomQuote");
  };

  var setError = function(){
    $('#Q').text('Connection Error');
    $('#A').text('~');
    $('#twt').attr('href','https://twitter.com/intent/tweet?text=%20%23RandomQuote');
  };

  var getData = function(){
    return $.ajax({
          url : "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?",
          dataType:'json',
          jsonp : 'jsonp',
    });
  };

  // Show the new quote
  var setNormalStatus = function(){
    $('#new').removeAttr('disabled');
    $('#twt').removeAttr('disabled');
    $('.loader').fadeOut(function(){$('#quote-area').slideDown()});
  };

  var new_quote = function() {
    setLoadingState().then(getData).then(setQuote,setError).always(setNormalStatus);
  };

  // Bind click event on main btn, and load the first quote
  $("#new").click(new_quote);
  new_quote();
});
