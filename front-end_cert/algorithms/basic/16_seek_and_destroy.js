
//Bonfire: Seek and Destroy	Jul 13, 2015	

function destroyer(arr) {
  // Get the optional args
  var opt_args =[];
  for (var i = 1; i < arguments.length;i++)
    opt_args.push(arguments[i]);
  
  // filter base array
  arr = arr.filter(function(e,i,a){
     var keep_el = true;
       for(i = 0; i < opt_args.length; i++){
         if(opt_args[i] === e){
           keep_el = false;
           break;
         }
       }
    return keep_el;
  });
  return arr;
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);
