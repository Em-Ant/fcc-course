
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
