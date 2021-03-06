/**
* -----------------------------------------------
*             RANDOM QUOTE MACHINE v1
*              for freeCodeCamp.com
* -----------------------------------------------
*
* This is the first version of the exercise, and
* my first zipline ever. It uses a local
* quotes archive.
*
* The interesting part is the twitter button:
* to update the text to tweet, the button needs
* to be removed from the DOM, then  a new one
* is generated by the Twitter API constructor,
* with the new quote as parameter.
*
* For this exercise I used :
* - Bootstrap
* - JQuery
* - Twitter Hashtag Button
* - Google Fonts
*
* A new version, with improved design, the simpler
* twitter web intents and a remote quotes service
* provided by forismatic.com is available at
* ------------------------------------------------
* ====> http://codepen.io/Em-Ant/pen/jPQqwB
* ------------------------------------------------
*/

$(document).ready(function() {

  // Local Archive
  var archive = {
    active_index : 0,
    quotes : [
{
      quote: "Start by doing what's necessary; then do what's possible; and suddenly you are doing the impossible.",
      author: "St. Francis"
    }, {
      quote: "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
      author: "Jimmy Dean"
    }, {
      quote: "Perfection is not attainable, but if we chase perfection we can catch excellence.",
      author: "Vince Lombardi"
    }, {
      quote: "In order to succeed, we must first believe that we can.",
      author: "Nikos Kazantzakis"
    },{
      quote: "It does not matter how slowly you go as long as you do not stop.",
      author: "Confucius"
    },{
      quote: "Life is not a problem to be solved, but a reality to be experienced.",
      author: "Soren Kierkegaard"
    },{
      quote: "Very little is needed to make a happy life; it is all within yourself, in your way of thinking.",
      author: "Marcus Aurelius"
    },{
      quote: "Life isn't about finding yourself. Life is about creating yourself.",
      author: "G. Bernard Shaw"
    }],

    quote_gen : function() {
      var ind;

      // The next quote index must be different from the current one
      do {
        ind = Math.floor(Math.random() * this.quotes.length);
      } while(ind ===  this.active_index);
      this.active_index = ind;
      return this.quotes[ind];
    }
  };

  /* Create a new tweet button with custom text
  Seems to be the only way to dynamically add text
  to the twitter form. */
  var btn_creator = function(text){
    $(".twitter-hashtag-button").remove();
    twttr.widgets.createHashtagButton(
  'RandomQuote',
    document.getElementById('tw-cont'),
    {
      count: 'none',
      text: text,
      hashtags : 'RandomQuote',
      size : "large"
    })
  };

  /* remove old quote and tweet button, then generate and configure
  a new quote and tweet share btn */
  var new_quote = function() {
    var q = archive.quote_gen();
    var $div;
    $("#quote-area div").remove();
    $div = $("<div></div>");
    $div.hide();
    $div.append($("<h3></h3>").text(q.quote));
    $div.append($("<h4></h4>").addClass("auth").text("- "+q.author));
    $div.fadeIn(500);
    $("#quote-area").append($div);
    btn_creator(q.quote+"["+q.author+"]");
  };

    /* When twitter.js is ready, bind the events and create
  the first quote */
  twttr.ready(
    function (twttr) {
      $("#new").click(new_quote);
      new_quote();
    }
  );
});
