
//Bonfire: Everything Be True	Jul 15, 2015	

function every(collection, pre) {
  // Does everyone have one of these?
  return !(collection.some(function(e,i,a){
    if (!e.hasOwnProperty(pre))
      return true;
    return false;
  }));
}

every([{'user': 'Tinky-Winky', 'sex': 'male'}, {'user': 'Dipsy', 'sex': 'male'}, {'user': 'Laa-Laa', 'sex': 'female'}, {'user': 'Po', 'sex': 'female'}], 'sex');

