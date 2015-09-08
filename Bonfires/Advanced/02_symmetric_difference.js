
//Bonfire: Symmetric Difference	Jul 23, 2015	

function sym(args) {
  return Array.prototype.reduce.call(arguments,function(acc,cur){
    return diff(uniq(acc),uniq(cur));
  },[]);
}

function half_dif(le,ri){
  return le.filter(function(e){
    var i = ri.indexOf(e);
    if ( i !== -1){
      return false;
    }
    return true;
  });
}

function diff(l,r){
  return half_dif(l,r).concat(half_dif(r,l));
}

function uniq(arr){
  var uni = [];
  arr.forEach(function(e){
    if (uni.indexOf(e) === -1)
      uni.push(e);
  });
  return uni;
}

sym([1, 1]);
