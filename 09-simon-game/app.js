$(document).ready(function(){
  
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  var frequencies = [329.63,261.63,220,164.81];
  var errOsc = audioCtx.createOscillator();
  errOsc.type = 'square';
  errOsc.frequency.value = 55;
  errOsc.start();

  var gameStatus = {};

  gameStatus.init = function(){
    this.strict = false;
    this.count = 0;
    this.lastPush = $('#0');
  };

  // create Oscillators 
  var oscillators = frequencies.map(function(frq){
    var osc = audioCtx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = frq;
    osc.start();
    return osc;
  });

  var gainNode = audioCtx.createGain();
  
  function playGoodTone(num){
    gameStatus.currOsc = oscillators[num];
    gameStatus.currOsc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    gameStatus.currPush = $('#'+num);
    gameStatus.currPush.addClass('light');
  };
  
  function stopGoodTones(){
    if(gameStatus.currPush)
      gameStatus.currPush.removeClass('light');
    if(gameStatus.currOsc)
      gameStatus.currOsc.disconnect(gainNode);
    gainNode.disconnect(audioCtx.destination);
    gameStatus.currPush = undefined;
    gameStatus.currOsc = undefined;
  };
  
  function playErrTone(){
    errOsc.connect(gainNode);
    errOsc.connect(audioCtx.destination);
  };
  
  function stopErrTone(){
    errOsc.disconnect(gainNode);
    gainNode.disconnect(audioCtx.destination);
  };
 
  function notifyError(pushObj){
    playErrTone();
    if(pushObj)
      pushObj.addClass('light');
    $('.clickable').removeClass('clickable').addClass('unclickable');
    setTimeout(function(){
      $('.unclickable').removeClass('unclickable').addClass('clickable');
      stopErrTone();
      if(pushObj)
        pushObj.removeClass('light');
    },1000);
    flashMessage('!!',2);
  };
  
  function notifyWin(){
    $('.clickable').removeClass('clickable').addClass('unclickable');
    var cnt = 0;
    var intv = setInterval(function(){
      gameStatus.lastPush.mousedown();
      setTimeout(function(){gameStatus.lastPush.mouseup();},80);
      cnt++;
      if(cnt === 8){
        clearInterval(intv);
        $('.unclickable').removeClass('unclickable').addClass('clickable');
      }
    },160);
    flashMessage('**',2);
  }
  
  function flashMessage(msg,times){
    $('.count').text(msg);
    var lf = function(){
      $('.count').addClass('led-off');
      setTimeout(function(){
        $('.count').removeClass('led-off');
      },250);
    };
    var cnt = 0;
    lf();
    var intv = setInterval(function(){
      lf();
      cnt++;
      if(cnt === times)
        clearInterval(intv);
    },500)
  };
  
  /**
  * TEST MODE
  */
  
  // COLORS || AUDIO TEST
  $('.push').mousedown(function(){
    playGoodTone($(this).attr('id'));
    gameStatus.lastPush = $(this);
  });
  
  $('*').mouseup(function(e){
    e.stopPropagation();
    stopGoodTones();
  });
  
  
  function toggleStrict(){
    $('#mode-led').toggleClass('led-on');
    gameStatus.strict = !gameStatus.strict;
    
    // AUDIO TEST
    notifyError();
  }
  
  $('.sw-slot').click(function(){
    $('#pwr-sw').toggleClass('sw-on');
    if($('#pwr-sw').hasClass('sw-on')==false){
      gameStatus.init();
      $('.count').text('--');
      $('.count').addClass('led-off');
      $('#mode-led').removeClass('led-on');
      $('.push').removeClass('clickable').addClass('unclickable');
      $('#start').off('click'); 
      $('#mode').off('click');
    }else{    
      $('.count').removeClass('led-off');
      $('.push').removeClass('unclickable').addClass('clickable');
      $('#start').click(notifyWin);  // Win testing
      $('#mode').click(toggleStrict); // Error testing
    }     
  });
  
  gameStatus.init();
  
});
