
//Bonfire: Arguments Optional	Jul 15, 2015	

function add() {
  if (arguments.length>= 2){
    if(Number.isFinite(arguments[0]) && Number.isFinite(arguments[1]))
      return arguments[0] + arguments[1];
    else
      return;
  }
  else if (arguments.length == 1){
    if(Number.isFinite(arguments[0])){     
      var ar1 = arguments[0];
      return function(x){
        if(Number.isFinite(x))
          return ar1+x;
        else
          return;
      };
    }else{
      return;
    }
  }
  else
    return;
}

add(2,3);
