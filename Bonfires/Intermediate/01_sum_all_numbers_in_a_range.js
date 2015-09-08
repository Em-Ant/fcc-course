
//Bonfire: Sum All Numbers in a Range	Jul 13, 2015	

function sumAll(arr) {
  var nums = [];
  arr.sort(function(a,b){return a - b;});
  for (var i = arr[0]; i<=arr[1]; i++){
    nums.push(i);  
  }
    
  console.log(nums);
  return nums.reduce(function(prev,curr,ind,array){
    return prev += curr;
  },0);
}

sumAll([5, 10]);
