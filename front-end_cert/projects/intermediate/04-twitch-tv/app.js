$(document).ready(function(){
  var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]; //["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","comster404","brunofin","MedryBW","thomasballinger","noobs2ninjas","beohoff"];

  var twitch_b64 = ' data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAIAAAABc2X6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AcDCxgLY5ls7AAABMRJREFUeNrtml9MW1Ucx88597a3rf0DTGDIUElMHE/GLSaa+OeJDQYuJsYH9GlRY4z64INubIaBTB5MTJFEZwJimGUxTmMwikoWYdFtiQWdkwUGysIAkeJgBem/e8/5+WDiSlva3uZy29ue32Pbc9PP/Z7f7/x+5/fDAIAKyQgqMOPA+W5iku9anx2c+33V0HjhkNI9/LTVZkoNvLYSmv7NZ7Objb2BBYzT3NKD/Vcki1goPkwVdunCvCCSQgH23wj5V0MFFLTGRxfDQVkQErwORWE4Z9UjGBOcCfBg/zghicQHOPT6g3KY5ibw2A9z05d9qoGX5tfn/7hpvc2UgBehRxvvydnturz4T0rgBDKODExJVkPGZ2Cp64JYYErZ5KUlQjDKU4sFDgeVP6/5CyiXPv/NTCRXY9K2AH/tGc/LfCMxcCggrywHMEYFpDCvhzkwB+bABqyWtLXr06srywEcFf1Fkdx7f5m49fkXDilXf/HB5jz+9gpbZXWRAYAHT1+5OHRNEG4B211Sh+eg3SVttcT/d7Dr6Aij7P9PGIPaJ3c/8+oDBgAmBAsijq6uBYGg5Kc9RoJIojMCzABrkeHzoMWBOTAH5sAcmANzYA7MgTkwB+bAHBjxK55tMQBgFDC6dWPDGKBUjT5GgdGoJQCaDA3qAbzvqZq9j9256U7LRCw2U5IlrhLri20PxwCWVtiNAVxds6O6ZoeqJZJV3PNIFffhFLb810YBAfd3jo6du54TW1oH87i9wwNTZkmIi5fIZBbyTWGP2zv06UT8mIZZEt7+5ImYdjfJA9qRL6fjp3DkCD36/v6Ku5x55cP/aRvfwTdLwolTjQn7Mgb24f5O73CiCStK4XjPgbJKR15FaY/bO3RmMt5vCcHHu+u3ojWqwqffHT37+WR8TMYYt/c1JqE1JLDH7f3+i6sxhw1CiCqspftAclrjAXvc3qEzE/GT6yaz0N73+M4qh8aJB8a4q3mEMUjzx02v7E34yleXA6fe+Ult9RNYC89MrsTTyhHa0l2fDm0mCl++uJDu2yE4FLgv/vPF2bW25wflCFXd7cU4/gSSLGJbb8Mdd7u2q1pKvyudcEJ1bTXU8dJ3VGGazK8qMmvvq9tZ5czRamlh5uaRpoHgRkSbuwuRtPU2qKLVNWhtrEc6Xh6SIxRrMdsIAK29DeW7HGoX6qTw4qz/SNNAOChr8jQAeONkXQa0OinsvxF684VvFY20FUXS+lFDeaUjs+XbqzDGyLew3nLoKzmsaPJARWbN7+3PmHbbFV6aX+/puEBlpom2kkVUG5N1BWYMet46TxVAWgxgyxGaQUxOAQyAIiGKVf5BwUSip+xiKrUkDwNAcoSmvKAGBHan1NJdn352kczLovM7RmHqVx8WVDg2RujsZxM//ziXwaZ1FFmea35IMKfYZcCgbJe9pNSmzem9KYIJePeecrWPGDs3C4BU8QKAs9hyuKs2s6Mlyz6cQQPEUWRp7W10Fkn611tZKA+dxZZjJ+uyQqt3Lg0Adpd07IO6kjIbypLpqrCrxNr6YYMjS9rqqjBjYHdJh7v2ZZdWP4VdxZYTHx+02U1ZvyTSIkozYHTLBjcAKi61vtZZmwu0sYlHIRgfauHAeWb/Atc0sHRgLB+XAAAAAElFTkSuQmCC'
  var users_data =[],temp = [];
  var selected_users;
   // The twitch API now requres a client-id.
   // I built a pass-through APi with db caching on HyperDev for FreeCodeCamp
   // to have a workaround to that.
  var url = "https://wind-bow.hyperdev.space/twitch-api/"; //"https://api.twitch.tv/kraken/"
  var st = "streams/";
  var us = "channels/";
  var cb = '?callback=?';

  var filter_online = function(el){
      return el.stream ? true : false ;
  };

  var click_fn = function(){
    switch ($(this).text()){
      case 'ALL' :
        selected_users = users_data;
        break;
      case 'ONLINE' :
        selected_users = users_data.filter(filter_online);
        break;
      case 'OFFLINE' :
        selected_users = users_data.filter(function(el){return !filter_online(el);});
        break;
    }
    displayElems(selected_users,$('.out'));
    $('.btn').removeClass('active');
    $(this).addClass('active');
    $('#search').val('');
  };


  var collectData = function(){
    var promises = users.map(function(el){
      return $.getJSON(url+st+el+cb,function(data){
        data.name = el;
        users_data.push(data);
      }).fail(function(x,t,r){console.log('fail '+t+' '+r)});
    });
    // call $.when() with an array or promises
    return $.when.apply(null,promises);
  };

  var collectLogos = function(){
    var promises = users_data.map(function(el){
      return $.getJSON(url+us+el.name+cb,function(data){
        el.logo = data.logo;
        temp.push(el);
      }).fail(function(x,t,r){console.log('fail '+t+' '+r)});
    });
    // call $.when() with an array or promises
    return $.when.apply(null,promises) ;
  };

  var displayElems = function(obj_array,$where){
    $where.empty();
    var $ul = $('<ul class="list-unstyled"></ul>');
    obj_array.forEach(function(el){
    var online = el.stream ? 'fa fa-check-square green' : ( el.stream === null ? 'fa fa-exclamation-circle yellow' : "fa fa-times-circle red" );
    var logo = el.logo ? el.logo : twitch_b64;
    var $li = $('<li class="users"><img class="logo" src="'+ logo +'"/></li>');
    var $div = $('<div class="data"></div>');
    $div.append('<h4 class="name"><a href="http://www.twitch.tv/' +el.name+ ' " target="_blank">'+el.name+'</a></h4><p class="online"><i class="' + online+'"></i></p>');
    if(el.stream)
      $div.append($('<p class="streaming" >'+ el.stream.game +'</p>'));
    if(el.error)
      $div.append($('<p class="streaming" >nonexisting or deleted account</p>'));
   $li.append($div);
   $ul.append($li);
  });
  $where.append($ul);
};

  function displayErr(){
    $('.pre').hide();
    $('.preload').append('<h3>CONNECTION ERROR!</h3>');
  };

  function displayData(){
    //Initialize after data are ready
    displayElems(users_data,$('.out'));
    selected_users = users_data;
    var $ul = $('<ul class="list-inline"></ul>');
    $ul.append($('<li></li>').append($('<div class="btn btn-primary active">ALL</div>').click(click_fn)));
    $ul.append($('<li></li>').append($('<div class="btn btn-primary">ONLINE</div>').click(click_fn)));
    $ul.append($('<li></li>').append($('<div class="btn btn-primary">OFFLINE</div>').click(click_fn)));
    $('#search').keyup(function(ev){
      if($('#search').val().length >= 2){
        displayElems(selected_users
          .filter(function(el){
            var regex = new RegExp($('#search').val(),'i');
            return el.name.match(regex);
          }),$('.out'));
      }else
        displayElems(selected_users,$('.out'));
    });
   $('.nav').prepend($ul);
   $('.preload').fadeOut();
   $('.active-wrap').fadeIn(500);
  };

    /*****************************
    * INITIALIZATION STARTS HERE
    *****************************/
  $('.active-wrap').hide();
  collectData().then(collectLogos,displayErr).then(displayData);
});
