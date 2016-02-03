
//Bonfire: Roman Numeral Converter	Jul 14, 2015	

function convert(num) {
  
  var roman_digit = function (num,order){
    
    if (order === undefined)  // default order
      order = 0;
    
    var symbol_array = ["I","V","X","L","C","D","M"];
      
      var sym_repeat = function(sym,times){
        var str = '';
        for(var i = 0; i < times; i++)
          str += sym;
        return str;
      };
    
    var out = '';
    
    // 3xxx is the max allowed with this symbol set
    if (order == 3 && num > 3)
      return 'MMM';
    
    // Buidls the digit strings
    if (num == 9)
      out = symbol_array[2*order] + symbol_array[2*order + 2];
    else if (num >= 5)
      out = symbol_array[2*order+1] + sym_repeat(symbol_array[2*order],num-5);
    else if (num == 4)
      out = symbol_array[2*order] + symbol_array[2*order + 1];
    else if (num > 0)
      out = sym_repeat(symbol_array[2*order],num);
    else
      out = '';
    return out;
  };
  
  var order = Math.floor(Math.log10(num));
  var out = '';
  
  if (order > 3)  // The current symbol set il limited to "M" 
    return out;
  
  for(; order >= 0; order--){
    var div = Math.pow(10,order);
    var dig = Math.floor(num / div);
    num -= dig*div;
    out += roman_digit(dig,order);
  }
  return out;
}

convert(36);

