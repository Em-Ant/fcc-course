
//Bonfire: Pairwise	Jul 21, 2015	

function pairwise(arr, arg) {
  var used = [];
  return arr.reduce(function(prev,curr,ind,ar){
    
    for(var i = 0; i  < ar.length; i++){
      if ((used.indexOf(ind) != -1) || (used.indexOf(i) != -1) ||ind === i )
        continue;
        
      if ((curr + ar[i]) === arg){
        used.push(i);
        used.push(ind);
        return prev+ind+i;
      }
    }
    return prev;
  },0);
}

pairwise([1,4,2,3,0,5], 7);
