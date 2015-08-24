
//Bonfire: Where do I belong	Jul 13, 2015	

function where(arr, num) {
  // Find my place in this sorted array.
  arr.push(num);
  arr.sort();
  return arr.indexOf(num);
}

where([40, 60], 50);
