
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
