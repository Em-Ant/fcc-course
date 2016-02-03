/**
* MY FIRST I/O!
* Exercise 3 of 13
*
* Write a program that uses a single synchronous filesystem operation to read a file 
* and print the number of newlines (\n) it contains to the console (stdout), similar to running cat * * file | wc -l.
*
* The full path to the file to read will be provided as the first command-line argument. You do not need to make your own test file. 
*
*/

var fs = require('fs');

var file = process.argv[2]; 
var fileContent = fs.readFileSync(file).toString();
var count = fileContent.split('\n').length -1;
console.log(count);
