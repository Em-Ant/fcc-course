
//Bonfire: Steamroller	Jul 15, 2015	

function steamroller(arr) {
   
  var acc = [];
  var flatten = function (el,ind,arr){
    if (Array.isArray(el))
       el.forEach(flatten);
    else
      return acc.push(el);
    };
  // I'm a steamroller, baby
    arr.forEach(flatten);
    return acc;
  }

steamroller([1, [2], [3, [[4]]]]);
