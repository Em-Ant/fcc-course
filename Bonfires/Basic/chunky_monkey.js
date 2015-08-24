
//Bonfire: Chunky Monkey	Jul 13, 2015	

function chunk(arr, size) {
  // Break it up.
  var multi_arr = [];
  while(arr.length)
    multi_arr.push(arr.splice(0,size));
  
  return multi_arr;
}

chunk(['a', 'b', 'c', 'd'], 2);
