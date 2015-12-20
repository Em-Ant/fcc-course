
//Bonfire: Drop it	Jul 15, 2015	

function drop(arr, func) {
  
  while(arr.length> 0 && !func(arr[0]))
    arr.shift();
  
  return arr;
}


drop([1, 2, 3], function(n) {return n < 3; });
