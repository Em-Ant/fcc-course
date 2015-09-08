
//Bonfire: Spinal Tap Case	Jul 14, 2015	

function spinalCase(str) {
  // "It's such a fine line between stupid, and clever."
  // --David St. Hubbins
  if (/[_ ]/g.test(str)) 
    return str.replace(/[_ ]/g , "-").toLowerCase();
  else
    return str.replace(/[A-Z]/g, '-'+'$&').toLowerCase();
}

spinalCase('This Is Spinal Tap');
