/**
* UPDATE
* Exercise 6 of 9
*
* Here we are going to update a document in the users collection.
*
* Say we have a user defined like:
*
*    {
*      "name": "Tina",
*      "age": 30,
*      "username": "tinatime"
*    }
*
* We want to change Tina's age from 30 to 40.
*
* For the purpose of this lesson, assume that the username property is unique.
*/

var mongo = require('mongodb').MongoClient

var url = 'mongodb://localhost:27017/learnyoumongo'

mongo.connect(url, function(err, db) {
	if (err) throw err;	
	var users = db.collection('users');
	users.update({
		username:'tinatime'
	},{
		$set : {
			age:40
		}
	},function(err,data){
		if(err) throw err;
		db.close();
	});
});

