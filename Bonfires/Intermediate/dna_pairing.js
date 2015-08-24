
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
