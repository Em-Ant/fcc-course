

//Bonfire: Meet Bonfire	Jul 13, 2015	

function meetBonfire(argument) {
  // Good luck!
  console.log("you can read this function's argument in the developer tools", argument);

  return true;
}


meetBonfire("You can do this!");

//Bonfire: Reverse a String	Jul 13, 2015	

function reverseString(str) {
  str = str.split('').reverse().join('');
  return str;
}

reverseString('hello');

//Bonfire: Factorialize a Number	Jul 13, 2015	

function factorialize(num) {
  if(num > 1)
    num *= factorialize(num -1);
  else
    num = 1;
  return num;
}

factorialize(5);

//Bonfire: Check for Palindromes	Jul 13, 2015	

function palindrome(str) {        
  
  str = str.replace(/\W/g,'').toLowerCase();  //lower case & strip non-alphanum chars 
  
  reversed_str = str;                                       // copy input string
  reversed_str = reversed_str.split('').reverse().join(''); // reverse input string copy
  
  if (reversed_str === str)
    return true;
  else
    return false;
}



palindrome("A man, a plan, a canal. Panama");

//Bonfire: Find the Longest Word in a String	Jul 13, 2015	

function findLongestWord(str) {
  
  words_array = str.split(' ');     // split input on spaces ' '. Get array of strings
  
  str = words_array[0];             
  for (i = 1; i < words_array.length; i++){                              
    if (words_array[i].length > str.length)   // compare with the longest preceding
        str = words_array[i];
  }
  
  return str.length;
}

findLongestWord('The quick brown fox jumped over the lazy dog');

//Bonfire: Title Case a Sentence	Jul 13, 2015	

function titleCase(str) {
  
  str = str.toLowerCase();                                          
  var words_array = str.split(' ');
  words_array.forEach(function(element,index,array){
    element = element.charAt(0).toUpperCase() + element.substr(1);   // Replace the first letter with the capitalized one 
    array[index] = element;                                          // Modify the Original Array !!!!
  });
  
  str = words_array.join(' ');
  return str;
}

titleCase("I'm a little tea pot");

//Bonfire: Return Largest Numbers in Arrays	Jul 13, 2015	

function largestOfFour(arr) {
  var max_nums = [];
  arr.forEach(function(el,ind,arr){
    max_nums.push(Math.max.apply(null,el));
  });
  return max_nums;
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);

//Bonfire: Confirm the Ending	Jul 13, 2015	

function end(str, target) {
  // "Never give up and good luck will find you."
  // -- Falcor
  str = str.substr(str.length - target.length);
  
  if (str === target)
    return true;
  return false;
}

end('Bastian', 'n');

//Bonfire: Repeat a string repeat a string	Jul 13, 2015	

function repeat(str, num) {
  // repeat after me
  var repeated_str = '';
  if(num)
    for(var i = 0; i<num; i++)
      repeated_str += str;
  return repeated_str;
}

repeat('abc', 3);

//Bonfire: Truncate a string	Jul 13, 2015	

function truncate(str, num) {
  // Clear out that junk in your trunk
  if(str.length > num)
    // 3 is the length of '...'
    str = str.slice(0,num-3) + '...'; 
 return(str);
}

truncate('A-tisket a-tasket A green and yellow basket', 11);

//Bonfire: Chunky Monkey	Jul 13, 2015	

function chunk(arr, size) {
  // Break it up.
  var multi_arr = [];
  while(arr.length)
    multi_arr.push(arr.splice(0,size));
  
  return multi_arr;
}

chunk(['a', 'b', 'c', 'd'], 2);

//Bonfire: Slasher Flick	Jul 13, 2015	

function slasher(arr, howMany) {
  // it doesn't always pay to be first
  arr.splice(0,howMany)
  return arr;
}

slasher([1, 2, 3], 2);

//Bonfire: Mutations	Jul 13, 2015	

function mutation(arr) {
  var base_str = arr[0].toLowerCase();
  var match_chars = arr[1].toLowerCase();
  var found = true;
  var index = 0;
  while(found && index < match_chars.length){
    if (base_str.indexOf(match_chars[index++]) === -1)
      found = false;
  }
  return found;
}

mutation(['hello', 'hey']);

//Bonfire: Falsey Bouncer	Jul 13, 2015	

function bouncer(arr) {
  // Don't show a false ID to this bouncer.
  arr = arr.filter(function(el,ind,array){
    if (el)
      return true;
    else
      return false;
  });
  return arr;
}

bouncer([7, 'ate', '', false, 9]);

//Bonfire: Where art thou	Jul 13, 2015	

function where(collection, source) {
  // What's in a name?
  var arr = collection.filter(function(el,i,array){
     var is_equiv = true;
     for (var prop in source){                              
       if (!(el.hasOwnProperty(prop) && source[prop] === el[prop])){
         is_equiv = false;
         break;
       }
     }
    return is_equiv;
  });
  return arr;
}

where([{ first: 'Romeo', last: 'Montague' }, { first: 'Mercutio', last: null }, { first: 'Tybalt', last: 'Capulet' }], { last: 'Capulet' });

//Bonfire: Seek and Destroy	Jul 13, 2015	

function destroyer(arr) {
  // Get the optional args
  var opt_args =[];
  for (var i = 1; i < arguments.length;i++)
    opt_args.push(arguments[i]);
  
  // filter base array
  arr = arr.filter(function(e,i,a){
     var keep_el = true;
       for(i = 0; i < opt_args.length; i++){
         if(opt_args[i] === e){
           keep_el = false;
           break;
         }
       }
    return keep_el;
  });
  return arr;
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);

//Bonfire: Where do I belong	Jul 13, 2015	

function where(arr, num) {
  // Find my place in this sorted array.
  arr.push(num);
  arr.sort();
  return arr.indexOf(num);
}

where([40, 60], 50);

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

//Bonfire: Where do I belong	Jul 13, 2015	

function where(arr, num) {
  // Find my place in this sorted array.
  arr.push(num);
  arr.sort(function(x,y){return x-y;});
  return arr.indexOf(num);
}

where([40, 60], 50);

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

//Bonfire: Roman Numeral Converter	Jul 14, 2015	

function convert(num) {
  
  var roman_digit = function (num,order){
    
    if (order === undefined)  // default order
      order = 0;
    
    var symbol_array = ["I","V","X","L","C","D","M"];
      
      var sym_repeat = function(sym,times){
        var str = '';
        for(var i = 0; i < times; i++)
          str += sym;
        return str;
      };
    
    var out = '';
    
    // 3xxx is the max allowed with this symbol set
    if (order == 3 && num > 3)
      return 'MMM';
    
    // Buidls the digit strings
    if (num == 9)
      out = symbol_array[2*order] + symbol_array[2*order + 2];
    else if (num >= 5)
      out = symbol_array[2*order+1] + sym_repeat(symbol_array[2*order],num-5);
    else if (num == 4)
      out = symbol_array[2*order] + symbol_array[2*order + 1];
    else if (num > 0)
      out = sym_repeat(symbol_array[2*order],num);
    else
      out = '';
    return out;
  };
  
  var order = Math.floor(Math.log10(num));
  var out = '';
  
  if (order > 3)  // The current symbol set il limited to "M" 
    return out;
  
  for(; order >= 0; order--){
    var div = Math.pow(10,order);
    var dig = Math.floor(num / div);
    num -= dig*div;
    out += roman_digit(dig,order);
  }
  return out;
}

convert(36);

//Bonfire: Search and Replace	Jul 14, 2015	

function replace(str, before, after) {
  
  var test_capitalize = function(t,s){
    if(t.charAt(0).toUpperCase() === t.charAt(0))
      return s.charAt(0).toUpperCase() + s.slice(1);
    else 
      return s;
  };
  
  str = str.split(" ");
  var ind = str.indexOf(before);
  if(ind != -1)
     str.splice(ind,1,test_capitalize(before,after));
  
  return str.join(" ");
}

replace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");

//Bonfire: Pig Latin	Jul 14, 2015	

function translate(str) {
 
  var vowels = ['a','e','i','o','u'];
  
  var is_vowel = function(char){
    if (vowels.indexOf(char) != -1)
      return true;
    else
      return false;
  }; 
  
  if (is_vowel(str.charAt(0)))
    return str + 'way';
  else{
    var new_str = '';
    var i = 0;
    while(!(is_vowel(str.charAt(i))) && i < str.length){
      new_str += str.charAt(i++);
    }
    str = str.slice(i);
    return str + new_str + 'ay';
  }
    
}

translate("consonant");

//Bonfire: DNA Pairing	Jul 14, 2015	

function pair(str) {
  var pair = function(char){
    switch (char){
      case 'A' :
        return 'T';
      case 'T' :
        return 'A';
      case 'C' :
        return 'G';
      case 'G':
        return 'C';
      default :
        return '';
    }
  };
  str = str.split('');
  var out = [];
  str.forEach(function(e,i,a){
    out.push([e,pair(e)]);
  });
  return out;
}

pair("GCG");

//Bonfire: DNA Pairing	Jul 14, 2015	

function pair(str) {
  var char_pair = function(char){
    switch (char){
      case 'A' :
        return 'T';
      case 'T' :
        return 'A';
      case 'C' :
        return 'G';
      case 'G':
        return 'C';
      default :
        return '';
    }
  };
  str = str.split('');
  var out = [];
  str.forEach(function(e,i,a){
    out.push([e,char_pair(e)]);
  });
  return out;
}

pair("GCG");

//Bonfire: Missing letters	Jul 14, 2015	

function fearNotLetter(str) {
  var i = 0; 
  while (i < str.length -1){
    if (str.charCodeAt(i) + 1 != str.charCodeAt(i+1)){
      return String.fromCharCode(str.charCodeAt(i) +1);
    }
    i++;
  }
}

fearNotLetter('abce');

//Bonfire: Boo who	Jul 14, 2015	

function boo(bool) {
  // What is the new fad diet for ghost developers? The Boolean.
  var test = true;
  return (bool.toString() === 'true' || bool.toString() === 'false');
}

boo(true);

//Bonfire: Boo who	Jul 14, 2015	

function boo(bool) {
  return (bool.toString() === 'true' || bool.toString() === 'false');
}

boo(true);

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

//Bonfire: Convert HTML Entities	Jul 14, 2015	

function convert(str) {
  // &colon;&rpar;
  var replacer = function(char){
    switch (char){
      case '&' :
        return '&amp;';
      case '<' :
        return '&lt;';
      case '>' :
        return '&gt;';
      case '\'' :
        return '&apos;';
      case '\"' :
        return '&quot;';
      default :
        return '';
    }
  };
  return str.replace(/[&<>\'\"]/g,replacer);
}

convert('Dolce & Gabbana');

//Bonfire: Spinal Tap Case	Jul 14, 2015	

function spinalCase(str) {
  // "It's such a fine line between stupid, and clever."
  // --David St. Hubbins
  if (/[_ ]/g.test(str)) 
    return str.replace(/[_ ]/g , "-").toLowerCase();
  else
    return str.replace(/[A-Z]/g, '-'+'$&').toLowerCase();
}

spinalCase('This Is Spinal Tap');

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

//Bonfire: Finders Keepers	Jul 15, 2015	

function find(arr, func) {
  var el;
  arr.some(function(e,i,a){
    if(func(e)){
      el = e;
      return true;
    }
    return false;
  });
  return el;
}

find([1, 2, 3, 4], function(num){ return num % 2 === 0; });

//Bonfire: Drop it	Jul 15, 2015	

function drop(arr, func) {
  
  while(arr.length> 0 && !func(arr[0]))
    arr.shift();
  
  return arr;
}


drop([1, 2, 3], function(n) {return n < 3; });

//Bonfire: Steamroller	Jul 15, 2015	

function steamroller(arr) {
   
  var acc = [];
  var flatten = function (el,ind,arr){
    if (Array.isArray(el))
       el.forEach(flatten);
    else
      return acc.push(el);
    };
  // I'm a steamroller, baby
    arr.forEach(flatten);
    return acc;
  }

steamroller([1, [2], [3, [[4]]]]);

//Bonfire: Binary Agents	Jul 15, 2015	

function binaryAgent(str) {
  str = str.split(' ');
  var str_dec =[];
  for (var i = 0; i< str.length; i++){
    str_dec.push(String.fromCharCode(parseInt(str[i],2)));
  }
   return str_dec.join('');
}

binaryAgent('01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111');

//Bonfire: Everything Be True	Jul 15, 2015	

function every(collection, pre) {
  // Does everyone have one of these?
  return collection.some(function(e,i,a){
    if (e.hasOwnProperty(pre))
      return true;
    return false;
  });
}

every([{'user': 'Tinky-Winky', 'sex': 'male'}, {'user': 'Dipsy', 'sex': 'male'}, {'user': 'Laa-Laa', 'sex': 'female'}, {'user': 'Po', 'sex': 'female'}], 'sex');

//Bonfire: Everything Be True	Jul 15, 2015	

function every(collection, pre) {
  // Does everyone have one of these?
  return !(collection.some(function(e,i,a){
    if (!e.hasOwnProperty(pre))
      return true;
    return false;
  }));
}

every([{'user': 'Tinky-Winky', 'sex': 'male'}, {'user': 'Dipsy', 'sex': 'male'}, {'user': 'Laa-Laa', 'sex': 'female'}, {'user': 'Po', 'sex': 'female'}], 'sex');

//Bonfire: Arguments Optional	Jul 15, 2015	

function add() {
  if (arguments.length>= 2){
    if(Number.isFinite(arguments[0]) && Number.isFinite(arguments[1]))
      return arguments[0] + arguments[1];
    else
      return;
  }
  else if (arguments.length == 1){
    if(Number.isFinite(arguments[0])){     
      var ar1 = arguments[0];
      return function(x){
        if(Number.isFinite(x))
          return ar1+x;
        else
          return;
      };
    }else{
      return;
    }
  }
  else
    return;
}

add(2,3);

//Bonfire: Make a Person	Jul 16, 2015	

var Person = function(firstAndLast) {
  // Private member
  var name = firstAndLast.split(" ");  
      
  this.setFullName = function(firstAndLast){
    name = firstAndLast.split(" ");  
  };
  
  this.setFirstName = function(first){
    name[0] = first;
  };

  this.setLastName = function(last){
    name[1] = last;
  };
  
  this.getFullName = function(){
    return (name[0] + " " + name[1]);
  };
  
  this.getFirstName = function(){
    return name[0];
  };

  this.getLastName = function(last){
    return name[1];
  };
  
};


var bob = new Person('Bob Ross');
bob.getFullName();

//Bonfire: Map the Debris	Jul 20, 2015	

function orbitalPeriod(arr) {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;
  var out = [];
  for (i = 0; i< arr.length; i++){
    var T = 2*Math.PI*Math.sqrt(Math.pow(arr[i].avgAlt + earthRadius,3)/GM);
    out.push({name : arr[i].name, orbitalPeriod : Math.round(T)});
  }
  return out;
}

orbitalPeriod([{name : "sputkin", avgAlt : 35873.5553}]);

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

//Bonfire: Validate US Telephone Numbers	Jul 23, 2015	

function telephoneCheck(str) {
  // Good luck!
  
  var reg = /^1?\s?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/;
  return reg.test(str);
}



telephoneCheck("555-555-5555");

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

//Bonfire: Exact Change	Jul 24, 2015	

function drawer(price, cash, cid) {
  var change = cash-price;
  var cash_total = function(cid){
     return cid.reduce(function(prev,curr){
       return prev += curr[1];
     },0);
  };
  
  if (cash_total(cid) < change)
    return "Insufficient Funds";
  else if (cash_total(cid) == change)
    return "Closed";
  else{
   var values = {
     PENNY : 0.01,
     NICKEL : 0.05,
     DIME : 0.10,
     QUARTER : 0.25,
     ONE : 1.00,
     FIVE : 5.00,
     TEN : 10.00,
     TWENTY : 20.00,
     'ONE HUNDRED' : 100.00
   };
   var out = [];
    for (var i = 0; i < cid.length; i++){
     if (values[cid[i][0]] > change)
       break;
      
    }
    i--;  // come back to the max coin value less than current change
   var add_partial = function(){
     var partial = Math.floor(change/values[cid[i][0]])*values[cid[i][0]];
    
     if (partial <= cid[i][1]){
       change -= partial;
       cid[i][1] -= partial;
       if(partial)
         out.push([cid[i][0],partial]);
     }
     else{
       if (cid[i][1] > 0.0){
         partial = cid[i][1];
         change -= partial;
         out.push([cid[i][0],partial]);
         cid[i][1] -= partial;
       }
     }
     change = parseFloat(Math.round(change+'e+2') +'e-2');  // rounding to avoid numerical errors
     i--;
   };
   while (change > 0)
     add_partial();
   return out;
  }
}




// Example cash-in-drawer array:
// [['PENNY', 1.01],
// ['NICKEL', 2.05],
// ['DIME', 3.10],
// ['QUARTER', 4.25],
// ['ONE', 90.00],
// ['FIVE', 55.00],
// ['TEN', 20.00],
// ['TWENTY', 60.00],
// ['ONE HUNDRED', 100.00]]
drawer(3.26, 100.00, [['PENNY', 1.01], ['NICKEL', 2.05], ['DIME', 3.10], ['QUARTER', 4.25], ['ONE', 90.00], ['FIVE', 55.00], ['TEN', 20.00], ['TWENTY', 60.00], ['ONE HUNDRED', 100.00]]);

//Bonfire: Exact Change	Jul 24, 2015	

/** THAT WAS QUITE HARD, 
I ADDED SOME COMMENT**/

function drawer(price, cash, cid) {
  var change = cash-price;
  var cash_total = function(cid){
     return cid.reduce(function(prev,curr){
       return prev += curr[1];
     },0);
  };
  
  // insufficient cash
  if (cash_total(cid) < change)
    return "Insufficient Funds";
  //exact cash amount in the drawer
  else if (cash_total(cid) == change)
    return "Closed";
  // money in the drawer exceed the change required,
  // let's go ...
  else{
    
    // define coin and bills values
   var values = {
     PENNY : 0.01,
     NICKEL : 0.05,
     DIME : 0.10,
     QUARTER : 0.25,
     ONE : 1.00,
     FIVE : 5.00,
     TEN : 10.00,
     TWENTY : 20.00,
     'ONE HUNDRED' : 100.00
   };
   var out = [];
    
    // find the min coin or bill exceding the current change
    for (var i = 0; i < cid.length; i++){
     if (values[cid[i][0]] > change)
       break;
      
    }
    // come back to the max coin or bill value less than current change
    i--;  
    
    // calc partial change with the current coin or bill
    // and add it to the output array
   var add_partial = function(){
     var partial = Math.floor(change/values[cid[i][0]])*values[cid[i][0]];
     
     // the partial change is available in the drawer
     if (partial <= cid[i][1]){
       change -= partial;
       cid[i][1] -= partial;
       if(partial)
         out.push([cid[i][0],partial]);
     }
     // the dersired partial change is not totally available,
     // we give the total amount of the current coins or bills in the drawer
     else{
       if (cid[i][1] > 0.0){
         partial = cid[i][1];
         change -= partial;
         out.push([cid[i][0],partial]);
         cid[i][1] -= partial;
       }
     }
     // rounding to avoid numerical errors
     change = parseFloat(Math.round(change+'e+2') +'e-2');  
     // shift down to the next smaller coin or bill 
     i--;
   };
   // iteratively calculate partials
   while (change > 0)
     add_partial();
   return out;
  }
}

drawer(3.26, 100.00, [['PENNY', 1.01], ['NICKEL', 2.05], ['DIME', 3.10], ['QUARTER', 4.25], ['ONE', 90.00], ['FIVE', 55.00], ['TEN', 20.00], ['TWENTY', 60.00], ['ONE HUNDRED', 100.00]]);


//Bonfire: Inventory Update	Jul 24, 2015	

// Compare and update inventory stored in a 2d array against a second 2d array of a fresh delivery. Update current inventory item quantity, and if an item cannot be found, add the new item and quantity into the inventory array in alphabetical order.

// Compare and update inventory stored in a 2d array against a second 2d array of a fresh delivery. Update current inventory item quantity, and if an item cannot be found, add the new item and quantity into the inventory array in alphabetical order.

function inventory(curInv, newInv) {
    var newElems =[];
    // i put the test func outside the loop ...
    var custom_test = function(el){
        return el[1] === newInv[newItem][1];
      };
  
    for (var newItem = 0; newItem < newInv.length; newItem++) {
      var index = curInv.findIndex(custom_test);
      if (index != -1){
        curInv[index][0] += newInv[newItem][0];
      }else{
        newElems.push(newInv[newItem]);  
        
      }
    }
    curInv = curInv.concat(newElems);
    curInv.sort(function(a,b) {
      if (a[1] < b[1]) { return -1;}
      if (a[1] > b[1]) { return 1;}
      return 0;
    });
    return curInv;

}

// Example inventory lists
var curInv = [
    [21, 'Bowling Ball'],
    [2, 'Dirty Sock'],
    [1, 'Hair Pin'],
    [5, 'Microphone']
];

var newInv = [
    [2, 'Hair Pin'],
    [3, 'Half-Eaten Apple'],
    [67, 'Bowling Ball'],
    [7, 'Toothpaste']
];

inventory(curInv, newInv);

//Bonfire: Inventory Update	Jul 24, 2015	

// Compare and update inventory stored in a 2d array against a second 2d array of a fresh delivery. Update current inventory item quantity, and if an item cannot be found, add the new item and quantity into the inventory array in alphabetical order.

// Compare and update inventory stored in a 2d array against a second 2d array of a fresh delivery. Update current inventory item quantity, and if an item cannot be found, add the new item and quantity into the inventory array in alphabetical order.

function inventory(curInv, newInv) {
    var newElems =[];
    // i put the test func outside the loop ...
    var custom_test = function(el){
        return el[1] === newInv[newItem][1];
      };
  
    for (var newItem = 0; newItem < newInv.length; newItem++) {
      var index = curInv.findIndex(custom_test);
      if (index != -1){
        curInv[index][0] += newInv[newItem][0];
      }else{
        newElems.push(newInv[newItem]);  
        
      }
    }
    curInv = curInv.concat(newElems);
    curInv.sort(function(a,b) {
      if (a[1] < b[1]) { return -1;}
      if (a[1] > b[1]) { return 1;}
      return 0;
    });
    return curInv;

}

// Example inventory lists
var curInv = [
    [21, 'Bowling Ball'],
    [2, 'Dirty Sock'],
    [1, 'Hair Pin'],
    [5, 'Microphone']
];

var newInv = [
    [2, 'Hair Pin'],
    [3, 'Half-Eaten Apple'],
    [67, 'Bowling Ball'],
    [7, 'Toothpaste']
];

inventory(curInv, newInv);

//Bonfire: Friendly Date Ranges	Jul 25, 2015	

function friendly(str) {
	var date_obj = str.map(function(el){
		var e = el.split('-');
		return {month : e[1], day : e[2], year : e[0]};
	});
    
    if (date_obj[0].day === date_obj[1].day && date_obj[0].month === date_obj[1].month && date_obj[0].year === date_obj[1].year){
      date_obj[1] = undefined;
    }else{
  
      if (date_obj[0].month === date_obj[1].month && date_obj[0].year === date_obj[1].year)
        date_obj[1].month = undefined;

      if (date_obj[0].year === date_obj[1].year)
        date_obj[0].year = undefined;

      var cur_year = new Date().getFullYear();
      if (date_obj[1].year == cur_year)
        date_obj[1].year = undefined;

      if (date_obj[0].year == cur_year && date_obj[1].year == cur_year+1){
        date_obj[1].year = undefined;
        date_obj[0].year = undefined;
      }
    }
    
    console.log(date_obj[1]);
        
    var months = ['January','February','March','April',
                  'May','June','July','August',
                 'September','October','November','December'];
    
    return date_obj.map(function(el){

    if(el){
          var cardinal = 'th';
      if(Math.floor(el.day / 10) !== 1){
        switch ( el.day % 10){
          case 1:
            cardinal = 'st';
            break;
          case 2:
            cardinal = 'nd';
            break;
          case 3:
            cardinal = 'rd';
            break;
          default:
        }
      }
      var date_str = [];
      if (el.month !== undefined)
        date_str.push(months[el.month-1]);
      if (el.day !== undefined)
        date_str.push(parseInt(el.day)+cardinal); 
     if (el.year !== undefined){
         date_str[date_str.length -1] +=',';
         date_str.push(el.year);
     }
     return date_str.join(' ');
    }else
      return undefined;
  }).filter(function(el){return el;});
}



friendly(['2015-12-01', '2015-12-01']);

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
