
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
