/**
* REMOVE
* Exercise 7 of 9
*
* This lesson involves removing a document with the given _id.
*
* The collection name will be passed as the first argument to your script.
*
* The _id will be passed as the second argument to your script.
*/

var mongo = require('mongodb').MongoClient

var collection = process.argv[2];
var id = process.argv[3];

var url = 'mongodb://localhost:27017/learnyoumongo'

mongo.connect(url, function(err, db) {
	if (err) throw err;	
	var coll = db.collection(collection);
	coll.remove({
		_id:id
	},function(err,data){
		if(err) throw err;
		db.close();
	});
});

