
//Bonfire: Return Largest Numbers in Arrays	Jul 13, 2015	

function largestOfFour(arr) {
  var max_nums = [];
  arr.forEach(function(el,ind,arr){
    max_nums.push(Math.max.apply(null,el));
  });
  return max_nums;
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);
