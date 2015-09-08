
//Bonfire: Mutations	Jul 13, 2015	

function mutation(arr) {
  var base_str = arr[0].toLowerCase();
  var match_chars = arr[1].toLowerCase();
  var found = true;
  var index = 0;
  while(found && index < match_chars.length){
    if (base_str.indexOf(match_chars[index++]) === -1)
      found = false;
  }
  return found;
}

mutation(['hello', 'hey']);
