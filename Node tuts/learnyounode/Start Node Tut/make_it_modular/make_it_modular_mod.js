/**
* MAKE IT MODULAR
* Exercise 6 of 13
*
* --- MODULE ---
*/

module.exports = function(pth,ext,cb){

	var fs = require('fs');
	var path = require('path');
	fs.readdir(pth,function(err,data){
		if(err)
			return cb(err);	
		var flt = data.filter(function(el){
			return (path.extname(el) === '.'+ext);
		});
		return cb(null,flt);
	}); 
}



