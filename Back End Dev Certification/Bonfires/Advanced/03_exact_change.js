
//Bonfire: Exact Change	Jul 24, 2015	

/** 
* THAT WAS QUITE HARD, 
* I ADDED SOME COMMENTS
*/

function drawer(price, cash, cid) {
  var change = cash-price;
  var cash_total = function(cid){
     return cid.reduce(function(prev,curr){
       return prev += curr[1];
     },0);
  };
  
  // insufficient cash
  if (cash_total(cid) < change)
    return "Insufficient Funds";
  //exact cash amount in the drawer
  else if (cash_total(cid) == change)
    return "Closed";
  // money in the drawer exceed the change required,
  // let's go ...
  else{
    
    // define coin and bills values
   var values = {
     PENNY : 0.01,
     NICKEL : 0.05,
     DIME : 0.10,
     QUARTER : 0.25,
     ONE : 1.00,
     FIVE : 5.00,
     TEN : 10.00,
     TWENTY : 20.00,
     'ONE HUNDRED' : 100.00
   };
   var out = [];
    
    // find the min coin or bill exceding the current change
    for (var i = 0; i < cid.length; i++){
     if (values[cid[i][0]] > change)
       break;
      
    }
    // come back to the max coin or bill value less than current change
    i--;  
    
    // calc partial change with the current coin or bill
    // and add it to the output array
   var add_partial = function(){
     var partial = Math.floor(change/values[cid[i][0]])*values[cid[i][0]];
     
     // the partial change is available in the drawer
     if (partial <= cid[i][1]){
       change -= partial;
       cid[i][1] -= partial;
       if(partial)
         out.push([cid[i][0],partial]);
     }
     // the dersired partial change is not totally available,
     // we give the total amount of the current coins or bills in the drawer
     else{
       if (cid[i][1] > 0.0){
         partial = cid[i][1];
         change -= partial;
         out.push([cid[i][0],partial]);
         cid[i][1] -= partial;
       }
     }
     // rounding to avoid numerical errors
     change = parseFloat(Math.round(change+'e+2') +'e-2');  
     // shift down to the next smaller coin or bill 
     i--;
   };
   // iteratively calculate partials
   while (change > 0)
     add_partial();
   return out;
  }
}

drawer(3.26, 100.00, [['PENNY', 1.01], ['NICKEL', 2.05], ['DIME', 3.10], ['QUARTER', 4.25], ['ONE', 90.00], ['FIVE', 55.00], ['TEN', 20.00], ['TWENTY', 60.00], ['ONE HUNDRED', 100.00]]);

