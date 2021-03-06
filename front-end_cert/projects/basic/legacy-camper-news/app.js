/**
* freeCodeCamp Camper News has been closed. I saved a snapshot of the 
* last data, in order to keep this legacy project working.
* Links to discussion maybe inactive.
*/

$(document).ready(function(){

  var dataUrl = 'https://rawgit.com/Em-Ant/fcc-course/master/front-end_cert/projects/basic/legacy-camper-news/hot_stories.json';
//var dataUrl = 'https://www.freecodecamp.com/news/hot';

  var getData = function(){
    return $.getJSON(dataUrl,function(data){
      return data;
    });
  };

  var displayElement = function(obj,$where){
    var $new_div = $('<a class="element" target="_blank"></a>').attr('href',obj.link);
    $new_div.hide();
    var pict = obj.image ? obj.image : obj.author.picture;
    var $img = $('<img></img>').bind('error',function(){
      $(this).unbind('error');
      if(obj.img)
        $(this).attr('src',obj.author.picture);
      else
       $(this).attr('src','https://s3.amazonaws.com/freecodecamp/camper-image-placeholder.png');
    }).attr('src',pict);
    $new_div.append($img);
    $new_div.append($('<h3 class="headline"></h3>').text(obj.headline.replace(/&amp;/g,'&').replace(/&quot;/g,'\"'))); //fix "&" char
    var discussUrl = "http://www.freecodecamp.com/news/" + obj.storyLink.replace(/\s/g,"-");
    if(obj.comments){
      var commStr = obj.comments.length+' comments';
    }else{
      commStr = 'go to discussion';
    }
    $new_div.append($('<a href="'+discussUrl+'" target="_blank"><h3 class="comments">'+commStr+'</h3></a>'));
    $new_div.append($('<a class="auth-link" href="http://www.freecodecamp.com/' + obj.author.username + '" target="_blank"><h3 class="author">@'+obj.author.username+'</h3>'));
    $new_div.append($('<div class="upvotes"><h3 class="up-nr">+'+obj.upVotes.length+'</h3></a></div>'));
    $where.append($new_div);
    $new_div.fadeIn(500);
  };

  function showData(data){
          $('#loader').hide();
      var col = 1;
      data.forEach(function(el){
        displayElement(el,$('.out-'+col));
        col++;
        if(col > 6)
          col = 1;
      });
    }

  function showErr(xhr,err){
    $('#loader img').hide();
    $('#loader').text("SORRY, CONNECTION ERROR !");
    console.log(xhr,err);
  }

  getData().then(showData,showErr);

});
