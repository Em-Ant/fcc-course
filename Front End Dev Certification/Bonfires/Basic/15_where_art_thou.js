
//Bonfire: Where art thou	Jul 13, 2015	

function where(collection, source) {
  // What's in a name?
  var arr = collection.filter(function(el,i,array){
     var is_equiv = true;
     for (var prop in source){                              
       if (!(el.hasOwnProperty(prop) && source[prop] === el[prop])){
         is_equiv = false;
         break;
       }
     }
    return is_equiv;
  });
  return arr;
}

where([{ first: 'Romeo', last: 'Montague' }, { first: 'Mercutio', last: null }, { first: 'Tybalt', last: 'Capulet' }], { last: 'Capulet' });
