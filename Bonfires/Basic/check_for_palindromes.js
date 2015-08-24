
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
