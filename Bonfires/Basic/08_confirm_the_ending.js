
//Bonfire: Confirm the Ending	Jul 13, 2015	

function end(str, target) {
  // "Never give up and good luck will find you."
  // -- Falcor
  str = str.substr(str.length - target.length);
  
  if (str === target)
    return true;
  return false;
}

end('Bastian', 'n');
