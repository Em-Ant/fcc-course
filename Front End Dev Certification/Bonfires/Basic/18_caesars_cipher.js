function rot13(encodedStr) {
  
  var codeArr = encodedStr.toUpperCase().split("");  // String to Array
  var decodedArr = []; // Your Result goes here
  // Only change code below this line
  
  decodedArr = codeArr.map(function(el) {
    var charCode = el.charCodeAt(0);
    if (charCode >= 65 && charCode <= 90) {
      charCode -= 13;
      if (charCode < 65)
        charCode += 26;
      return String.fromCharCode(charCode);
    } else {
      return el;
    }
  });
  
  
  // Only change code above this line
  return decodedArr.join(""); // Array to String
}

// Change the inputs below to test
rot13("SERR PBQR PNZC");

