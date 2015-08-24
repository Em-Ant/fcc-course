
//Bonfire: Sorted Union	Jul 14, 2015	

function unite(arr1, arr2, arr3) {
  var filt_and_conc = function(arr1,arr2){
    arr2 = arr2.filter(function(e,i,a){
      if(arr1.indexOf(e) != -1)
        return false;
      return true;
    });
    return arr1.concat(arr2);
  };
  arr1 = filt_and_conc(arr1,arr2);
  return filt_and_conc(arr1,arr3);
}

unite([1, 2, 3], [5, 2, 1, 4], [2, 1]);


