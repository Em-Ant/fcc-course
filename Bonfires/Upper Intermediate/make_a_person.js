
//Bonfire: Make a Person	Jul 16, 2015	

var Person = function(firstAndLast) {
  // Private member
  var name = firstAndLast.split(" ");  
      
  this.setFullName = function(firstAndLast){
    name = firstAndLast.split(" ");  
  };
  
  this.setFirstName = function(first){
    name[0] = first;
  };

  this.setLastName = function(last){
    name[1] = last;
  };
  
  this.getFullName = function(){
    return (name[0] + " " + name[1]);
  };
  
  this.getFirstName = function(){
    return name[0];
  };

  this.getLastName = function(last){
    return name[1];
  };
  
};


var bob = new Person('Bob Ross');
bob.getFullName();
