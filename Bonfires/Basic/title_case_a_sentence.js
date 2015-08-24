
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
