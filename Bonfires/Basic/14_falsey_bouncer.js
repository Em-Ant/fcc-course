
//Bonfire: Falsey Bouncer	Jul 13, 2015	

function bouncer(arr) {
  // Don't show a false ID to this bouncer.
  arr = arr.filter(function(el,ind,array){
    if (el)
      return true;
    else
      return false;
  });
  return arr;
}

bouncer([7, 'ate', '', false, 9]);
