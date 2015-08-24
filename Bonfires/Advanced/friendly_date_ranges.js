
//Bonfire: Friendly Date Ranges	Jul 25, 2015	

function friendly(str) {
	var date_obj = str.map(function(el){
		var e = el.split('-');
		return {month : e[1], day : e[2], year : e[0]};
	});
    
    if (date_obj[0].day === date_obj[1].day && date_obj[0].month === date_obj[1].month && date_obj[0].year === date_obj[1].year){
      date_obj[1] = undefined;
    }else{
  
      if (date_obj[0].month === date_obj[1].month && date_obj[0].year === date_obj[1].year)
        date_obj[1].month = undefined;

      if (date_obj[0].year === date_obj[1].year)
        date_obj[0].year = undefined;

      var cur_year = new Date().getFullYear();
      if (date_obj[1].year == cur_year)
        date_obj[1].year = undefined;

      if (date_obj[0].year == cur_year && date_obj[1].year == cur_year+1){
        date_obj[1].year = undefined;
        date_obj[0].year = undefined;
      }
    }
    
    console.log(date_obj[1]);
        
    var months = ['January','February','March','April',
                  'May','June','July','August',
                 'September','October','November','December'];
    
    return date_obj.map(function(el){

    if(el){
          var cardinal = 'th';
      if(Math.floor(el.day / 10) !== 1){
        switch ( el.day % 10){
          case 1:
            cardinal = 'st';
            break;
          case 2:
            cardinal = 'nd';
            break;
          case 3:
            cardinal = 'rd';
            break;
          default:
        }
      }
      var date_str = [];
      if (el.month !== undefined)
        date_str.push(months[el.month-1]);
      if (el.day !== undefined)
        date_str.push(parseInt(el.day)+cardinal); 
     if (el.year !== undefined){
         date_str[date_str.length -1] +=',';
         date_str.push(el.year);
     }
     return date_str.join(' ');
    }else
      return undefined;
  }).filter(function(el){return el;});
}

friendly(['2015-12-01', '2015-12-01']);
