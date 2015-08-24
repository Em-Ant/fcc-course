
//Bonfire: Factorialize a Number	Jul 13, 2015	

function factorialize(num) {
  if(num > 1)
    num *= factorialize(num -1);
  else
    num = 1;
  return num;
}

factorialize(5);
