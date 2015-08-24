var fs = require('fs');

var file = process.argv[2]; 
var fileContent = fs.readFileSync(file).toString();
var count = fileContent.split('\n').length -1;
console.log(count);
