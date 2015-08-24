
//Bonfire: Repeat a string Jul 13, 2015	

function repeat(str, num) {
  // repeat after me
  var repeated_str = '';
  if(num)
    for(var i = 0; i<num; i++)
      repeated_str += str;
  return repeated_str;
}

repeat('abc', 3);
