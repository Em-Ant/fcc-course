
//Bonfire: No repeats please	Jul 26, 2015	

function permAlone(str){
  
  /** 
  * Brute Force Heap's Algorithm
  * It's ultra slow, i think i should use
  * another approach ...
  */
  
  var permutationArr = function(num) 
  { 
    var arr = (num + '').split(''),
    permutations = [];   

    function swap(a, b)
    {
      var tmp = arr[a];
      arr[a] = arr[b];
      arr[b] = tmp;
    }

    function generate(n) {
      if (n == 1) {
        permutations.push(arr.join(''));
      } else {
        for (var i = 0; i != n; ++i) {
          generate(n - 1);
          swap(n % 2 ? 0 : i, n - 1);
        }
      }
    }

    generate(arr.length);
    return permutations;
  }; 
  var permArr =  permutationArr(str);
  reg = /([a-z])\1/i;  // Match the repeated chars
  var count = 0;
  permArr.forEach(function(e){
    if(!reg.test(e))
      count++;
  });
 return count;
}

permAlone('aab');
