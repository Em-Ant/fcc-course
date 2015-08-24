
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
