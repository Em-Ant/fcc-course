
//Bonfire: Sum All Odd Fibonacci Numbers	Jul 15, 2015	

function sumFibs(num) {
  var fib = 0;
  var fib_next = 1;
  var acc = 0;
  while(fib_next <= num){
    var sw = fib_next;
    fib_next += fib;
    fib = sw;
    if (fib%2 !== 0)
      acc+=fib;
  }
  return acc;
}

sumFibs(1000);
