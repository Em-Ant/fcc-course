
//Bonfire: Smallest Common Multiple	Jul 15, 2015	

function smallestCommons(arr) {
  var isMult = function(n){
    var out = true;
    var i = Math.min.apply(null,arr);
    while(out && i<=Math.max.apply(null,arr)){
      if(n%i++ !== 0)
        out = false;
    }
    return out;
  };
  
  var commMult = Math.max.apply(null,arr);
  while(!isMult(commMult)){
    commMult++;
  }
  return(commMult);
}


smallestCommons([1,5]);
