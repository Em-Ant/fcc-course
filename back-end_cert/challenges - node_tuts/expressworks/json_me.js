/**
* JSON ME
* Exercise 8 of 8
*
* Write a server that reads a file, parses it to JSON and outputs the content
* to the user.
*
* The port is passed in process.argv[2].  The file name is passed in process.argv[3].
*
* Respond with:
*
*   res.json(object)
*
* Everything should match the '/books' resource path.
*/

var express = require('express');
var fs = require('fs');

var port = process.argv[2];
var file = process.argv[3];

var app = express();
app.get('/books',function(req,res){
	fs.readFile(file,function(err,data){
		if(err) return res.send(500);
		try{
			var books = JSON.parse(data);
		} catch (e) {
			res.send('500');
		}
		res.json(books);
	});
});

app.listen(port);
