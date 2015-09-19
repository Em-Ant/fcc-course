/**
*     SIMPLE POCKET CALCULATOR
*       for freeCodeCamp.com
*
* --------------------------------------
*   !!! It has a FIXED layout !!!
*   It's not designed for use on
*   small devices (phones)
* --------------------------------------
*/

$(document).ready(function() {

  var current_out = [];         // display digits, as an array of chars
  var active_operator;          // char in [+-*/] representing the last op button pushed
  var previous_operand;         // float -the first operand for chaining ops

  // Custom base logarithm
  // Math.log10 is unsupported in old browsers
  function getBaseLog(b, e) {
    return Math.log(e) / Math.log(b);
  }

  // fallbacks for 'weird' inputs
  function parseCurrOpnd(digitsString) {

    if (digitsString === '.') return 0.0;
    if(isNaN(parseFloat(digitsString))) return 0.0;
    else return parseFloat(digitsString);
  }

  // one callback for all the buttons
  $('.btn').click(function(){
    switch($(this).text()){
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0": {

        // if the user pressed a digit
        // add the symbol to the display array, and show it
        if(current_out.length < 10){
          current_out.push($(this).text());
          $('.result h2').text(current_out.join(''));
        }
        break;
      }

      // if the user pressed the decimal point
      // add the symbol only if it's the first one, and show it
      case ".": {
        if(current_out.indexOf('.') === -1 && current_out.length < 10) {
          current_out.push($(this).text());
          $('.result h2').text(current_out.join(''));
        }
        break;
      }
      case "AC":{

        // ALL CLEAR
        current_out = [];
        previous_operand = undefined;
        active_operator = undefined;
        $('.result h2').text('0');
        break;
      }
      case "CE":{

        // CLEAR LAST IN : push back a char from display
        current_out.pop();
        var disp = (current_out.length) ? current_out.join('') : '0';
        $('.result h2').text(disp);
        break;
      }

      /* if the user pressed an operator button, the previous pending
      operation is executed and returned, then the active op is set */
      case "x":{
        exec_active_oper(parseCurrOpnd(current_out.join('')));
        active_operator = "x";
        break;
      }
      case "+":{
        exec_active_oper(parseCurrOpnd(current_out.join('')));
        active_operator = "+";
        break;
      }
      case "-":{
        exec_active_oper(parseCurrOpnd(current_out.join('')));
        active_operator = "-";
        break;
      }
      case "/":{
        exec_active_oper(parseCurrOpnd(current_out.join('')));
        active_operator = "/";
        break;
      }
      case "%":{

        /* % calculates the current display percent of the
        pending operand*/
        if(previous_operand){
          if (current_out.length > 0)
            var perc = previous_operand * parseCurrOpnd(current_out.join('')) /100.0;
          else
            perc = 0;
          exec_active_oper(perc);
          active_operator = undefined;
          break;
        }
      }
      case "=":{
        exec_active_oper(parseCurrOpnd(current_out.join('')));
        active_operator = undefined;
        break;
      }
    }
  });

  // BUSINESS LOGIC HERE
  exec_active_oper=function(curr_opnd){
    if (active_operator ){
      switch(active_operator){
        case "x":{
          previous_operand *= curr_opnd;
          break;
        }
        case "+":{
          previous_operand += curr_opnd;
          break;
        }
        case "-":{
          previous_operand -= curr_opnd;
          break;
        }
        case "/":{
          previous_operand /= curr_opnd;
          break;
        }
      }
    } else {

      /* if there is not active pending operator, returns the current display
      as the pending operand */
      previous_operand = parseCurrOpnd($('.result h2').text());
    }

    // the calc allows max 10 digits for  rationals
    var rounder;
    if(previous_operand !== 0)
      rounder = Math.floor(getBaseLog(10,Math.abs(previous_operand)));
    else
      rounder = 0;
    rounder = Math.pow(10,10-rounder);
    var rounded = Math.round(previous_operand*rounder)/rounder;

    // check if output is to big to be displayed.
    // !! No scientific notation.
    if (rounded <= 9999999999 && rounded >= -9999999999) {
      $('.result h2').text(rounded);
    } else {
      $('.result h2').text('err');
      previous_operand = undefined;
    }
    current_out = [];
  }
});
