$(document).ready(function(){
  
  var getData = function(){
    return $.getJSON('http://www.freecodecamp.com/stories/hotStories',function(data){
      return data;
    });
  };

  var displayElement = function(obj,$where){
    var $new_div = $('<a class="element"></a>').attr('href',obj.link);
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
    $new_div.append($('<h3 class="headline"></h3>').text(obj.headline));
    var discussUrl = "http://www.freecodecamp.com/news/" + obj.storyLink.replace(" ","-")
    if(obj.comments){
      var commStr = obj.comments.length+' comments';
    }else{
      commStr = 'go to discussion';
    }
    $new_div.append($('<a href="'+discussUrl+'"><h3 class="comments">'+commStr+'</h3></a>'));
    $new_div.append($('<h3 class="author">'+obj.author.username+'</h3>'));
    $new_div.append($('<div class="upvotes"><h3 class="up-nr">+'+obj.upVotes.length+'</h3></div>'));
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
