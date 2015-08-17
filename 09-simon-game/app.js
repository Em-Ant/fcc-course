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

gameStatus.init();
  
// create Oscillator node
var oscillators = frequencies.map(function(frq){
  var osc = audioCtx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = frq;
  osc.start();
  return osc;
});

  var gainNode = audioCtx.createGain();
  
  // COLORS || AUDIO TEST
  $('.push').mousedown(function(){
    gameStatus.currPush = $(this);
    gameStatus.lastPush = $(this);
    gameStatus.currPush.addClass('light');
    gameStatus.currOsc = oscillators[parseInt($(this).attr('id'))];
    gameStatus.currOsc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
  });
  
  $('*').mouseup(function(){
    if(gameStatus.currPush)
      gameStatus.currPush.removeClass('light');
    if(gameStatus.currOsc)
      gameStatus.currOsc.disconnect(gainNode);
    gainNode.disconnect(audioCtx.destination);
    gameStatus.currPush = undefined;
    gameStatus.currOsc = undefined;
  });
  
  //ERROR SOUND TEST
  function notifyError(pushObj){
    errOsc.connect(gainNode);
    errOsc.connect(audioCtx.destination);
    pushObj.addClass('light');
    $('.push').removeClass('clickable').addClass('unclickable');
    setTimeout(function(){
      $('.push').removeClass('unclickable').addClass('clickable');
      errOsc.disconnect(gainNode);
      gainNode.disconnect(audioCtx.destination);
      pushObj.removeClass('light');
    },1000);
    flashMessage('!!',2);
  };
  
  function notifyWin(){
    $('.push').removeClass('clickable').addClass('unclickable');
    var cnt = 0;
    var intv = setInterval(function(){
      gameStatus.lastPush.mousedown();
      setTimeout(function(){gameStatus.lastPush.mouseup();},80);
      cnt++;
      if(cnt === 8){
        clearInterval(intv);
        $('.push').addClass('clickable').removeClass('unclickable');
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
  
  function toggleStrict(){
    $('#mode-led').toggleClass('led-on');
    gameStatus.strict = !gameStatus.strict;
    notifyError(gameStatus.lastPush);
  }
  
  $('.sw-slot').click(function(){
    $('#pwr-sw').toggleClass('sw-on');
    if($('#pwr-sw').hasClass('sw-on')==false){
      gameStatus.init();
      $('.count').text('--');
      $('.count').addClass('led-off');
      $('#mode-led').removeClass('led-on');
      $('.push').removeClass('clickable').addClass('unclickable');
      $('#start').off('click');  // TEMP for testing
      $('#mode').off('click');
    }else{    
      $('.count').removeClass('led-off');
      $('.push').removeClass('unclickable').addClass('clickable');
      $('#start').click(notifyWin);  // TEMP for testing
      $('#mode').click(toggleStrict);
    }     
  });
  
});
