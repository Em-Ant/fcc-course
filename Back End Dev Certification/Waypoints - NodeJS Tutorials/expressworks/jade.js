/**
* JADE
* Exercise 3 of 8
*
* Create an Express.js app with a home page rendered by Jade template engine.
*
* The homepage should respond to /home.
*
* The view should show the current date using toDateString.
*
*/

var express = require('express');
var port = process.argv[2];
var path = process.argv[3];

var app = express();
app.set('views',path);
app.set('view engine','jade');

app.get('/home',function(req,res){
	res.render('index',
	{
		date: new Date().toDateString()
	});
});

app.listen(port);
