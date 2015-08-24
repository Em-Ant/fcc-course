
//Bonfire: Sum All Primes	Jul 15, 2015	

function sumPrimes(num) {
  var isPrime = function(n){
    if (n==2 || n==3) 
      return true;
    if (n%2===0 || n<2) 
      return false;
    for (var i=3; i < Math.floor(Math.sqrt(n))+1; i+=2){  // only odd numbers
        if (n%i===0)
            return false;    
    }
    return true;    
  };
  
  var acc = 0;
  for(var i = 2; i <= num; i++){
    if(isPrime(i))
      acc+=i;
  }
  return acc;
}

sumPrimes(10);
