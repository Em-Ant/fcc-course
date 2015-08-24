
//Bonfire: Validate US Telephone Numbers	Jul 23, 2015	

function telephoneCheck(str) {
  // Good luck!
  
  var reg = /^1?\s?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/;
  return reg.test(str);
}



telephoneCheck("555-555-5555");
