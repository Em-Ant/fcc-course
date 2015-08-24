
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
