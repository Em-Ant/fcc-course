
//Bonfire: Truncate a string	Jul 13, 2015	

function truncate(str, num) {
  // Clear out that junk in your trunk
  if(str.length > num)
    // 3 is the length of '...'
    str = str.slice(0,num-3) + '...'; 
 return(str);
}

truncate('A-tisket a-tasket A green and yellow basket', 11);

