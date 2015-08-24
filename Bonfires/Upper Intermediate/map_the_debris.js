
//Bonfire: Map the Debris	Jul 20, 2015	

function orbitalPeriod(arr) {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;
  var out = [];
  for (i = 0; i< arr.length; i++){
    var T = 2*Math.PI*Math.sqrt(Math.pow(arr[i].avgAlt + earthRadius,3)/GM);
    out.push({name : arr[i].name, orbitalPeriod : Math.round(T)});
  }
  return out;
}

orbitalPeriod([{name : "sputkin", avgAlt : 35873.5553}]);
