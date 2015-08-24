
//Bonfire: Inventory Update	Jul 24, 2015	

// Compare and update inventory stored in a 2d array against a second 2d array of a fresh delivery. Update current inventory item quantity, and if an item cannot be found, add the new item and quantity into the inventory array in alphabetical order.

// Compare and update inventory stored in a 2d array against a second 2d array of a fresh delivery. Update current inventory item quantity, and if an item cannot be found, add the new item and quantity into the inventory array in alphabetical order.

function inventory(curInv, newInv) {
    var newElems =[];
    // i put the test func outside the loop ...
    var custom_test = function(el){
        return el[1] === newInv[newItem][1];
      };
  
    for (var newItem = 0; newItem < newInv.length; newItem++) {
      var index = curInv.findIndex(custom_test);
      if (index != -1){
        curInv[index][0] += newInv[newItem][0];
      }else{
        newElems.push(newInv[newItem]);  
        
      }
    }
    curInv = curInv.concat(newElems);
    curInv.sort(function(a,b) {
      if (a[1] < b[1]) { return -1;}
      if (a[1] > b[1]) { return 1;}
      return 0;
    });
    return curInv;

}

// Example inventory lists
var curInv = [
    [21, 'Bowling Ball'],
    [2, 'Dirty Sock'],
    [1, 'Hair Pin'],
    [5, 'Microphone']
];

var newInv = [
    [2, 'Hair Pin'],
    [3, 'Half-Eaten Apple'],
    [67, 'Bowling Ball'],
    [7, 'Toothpaste']
];

inventory(curInv, newInv);
