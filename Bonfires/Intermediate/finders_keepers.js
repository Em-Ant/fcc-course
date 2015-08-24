
//Bonfire: Finders Keepers	Jul 15, 2015	

function find(arr, func) {
  var el;
  arr.some(function(e,i,a){
    if(func(e)){
      el = e;
      return true;
    }
    return false;
  });
  return el;
}

find([1, 2, 3, 4], function(num){ return num % 2 === 0; });

