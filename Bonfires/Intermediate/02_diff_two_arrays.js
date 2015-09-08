
//Bonfire: Diff Two Arrays	Jul 14, 2015	

function filt_array(arr1,arr2){
  return arr1.filter(function(e,i,a){
    if(arr2.indexOf(e) != -1)
      return false;
     else
       return true;
  });
}

function diff(arr1, arr2) {
  var newArr1 = filt_array(arr1,arr2);
  var newArr2 = filt_array(arr2,arr1);
  return newArr1.concat(newArr2);
}

diff([1, 2, 3, 5], [1, 2, 3, 4, 5]);
