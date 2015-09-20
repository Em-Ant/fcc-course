$(document).ready(function(){

  var minAngle;
  var secAngle;
  var intvHndl;
  var minutes,seconds;
  var work_min = 25, break_min = 5;
  var active = 'work';
  var clicks = 0,cl_dly = 250, cl_tout;

  var updateDurations = function(){
    $('.b-time').text(break_min);
    $('.w-time').text(work_min);
  };

  var displayDigits = function(){
    var secPad = (seconds < 10) ? '0' : '';
    var minPad = (minutes < 10) ? '0' : '';
    $('.sec-hand').css('transform','rotate('+secAngle+'deg)');
    $('.sec-hand').css('-webkit-transform','rotate('+secAngle+'deg)');
    $('.sec-hand').css('-ms-transform','rotate('+secAngle+'deg)');
    $('.digit').empty().append($('<h2>'+minPad+minutes+' : '+secPad+seconds+'</h2>'));
  }

  var displayClock = function(){
    if(seconds > 0 ){
      minAngle = (60-minutes -1)*6 + Math.floor((60-seconds)/10.0);;
      secAngle = (60-seconds)*6;
    } else {
      minAngle = (60-minutes)*6;
      secAngle = 0;
    }
    $('.min-hand').css('transform','rotate('+minAngle+'deg)');
    $('.min-hand').css('-webkit-transform','rotate('+minAngle+'deg)');
    $('.sec-hand').css('-ms-transform','rotate('+secAngle+'deg)');
    displayDigits();
  };

  var switchStatus = function(){
    // Switch Graphics
    $('.po').toggleClass('noshow');
    $('.cof').toggleClass('noshow');
    $('.min-hand, .clock-center').toggleClass('grey');
    $('.min-hand, .clock-center').toggleClass('white');
    $('.sec-hand').toggleClass('red');
    $('.sec-hand').toggleClass('yellow');

    $('.'+active).removeClass('orange-border green-border');
    if(active === 'work'){
      minutes = break_min;
      active = 'break';
    } else {
      minutes = work_min;
      active = 'work';
    }
    seconds = 0;
    $('.'+active).addClass('orange-border');
    displayClock();
  };

  var stopClock = function(){
    clearInterval(intvHndl);
    intvHndl = undefined;
    $('.'+active).removeClass('orange-border green-border').addClass('orange-border');
  };

  var startClock = function(){
    intvHndl = setInterval(updateClock,1000);
    $('.'+active).removeClass('orange-border green-border').addClass('green-border');
  };

  var resetFun = function(){
    switchStatus();
    setTimeout(startClock,1000);
  };

  var updateClock = function(){
    if(minutes === 0 && seconds === 0){
        stopClock();
        resetFun();
    }else{
      if(seconds === 0){
        minutes--;
        seconds = 60;
      }
      seconds--;
    }
    displayClock();
  };

  var resetClock = function(){
    clearTimeout(cl_tout);
    stopClock();
    seconds = 0;
    minutes = work_min;
    if(active != 'work')
      switchStatus();
    displayClock();
  };

  $('.tgl').click(function(){
    // custom double click callback to prevent single click firing
    clicks++;
    if ( clicks === 1)
      cl_tout = setTimeout(function(){
        if(intvHndl)
          stopClock();
        else
          startClock();
        clicks = 0;
      },cl_dly);
    else if (clicks > 1){
      resetClock();
      clicks = 0;
    }
  }).dblclick(function(e){
    e.preventDefault();
  });

  var checkTime = function(n){
    if (n == 60)
      return  1;
    else if (n == 0)
      return  59;
    else
      return n;
  };

  $('.reset').click(resetClock);

  $('.btn').click(function(){
    var editing;
    switch ($(this).attr('id')){
      case 'b-p' :
        break_min++;
        editing = 'break';
        break;
      case 'b-m' :
        break_min--;
        editing = 'break';
        break;
      case 'w-p' :
        work_min++;
        editing = 'work';
        break;
      case 'w-m' :
        work_min--;
        editing = 'work';
        break;
    }
    break_min = checkTime(break_min);
    work_min = checkTime(work_min);
    updateDurations();
    if(!intvHndl && active===editing){
      seconds = 0;
        if(active==='work')
          minutes = work_min;
        else
          minutes = break_min;
        displayClock();
    }
  });

  $('.work').addClass('orange-border');
  minutes = work_min;
  seconds = 0;
  updateDurations();
  displayClock();
})
