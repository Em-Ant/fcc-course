
//Bonfire: Slasher Flick	Jul 13, 2015	

function slasher(arr, howMany) {
  // it doesn't always pay to be first
  arr.splice(0,howMany)
  return arr;
}

slasher([1, 2, 3], 2);
