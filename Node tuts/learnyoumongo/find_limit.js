/**
* FIND LIMIT
* Exercise 4 of 9
*
* Here we will learn how to search for documents but only fetch the fields
* we need.
*
* Use the parrots collection to find all documents where age
* is greater than the first argument passed to your script.
*
* The difference from the last lesson will be that we only want the
* name and age properties
* 
* Using console.log, print the documents to stdout.
*/

var mongo = require('mongodb').MongoClient
var age = process.argv[2]

var url = 'mongodb://localhost:27017/learnyoumongo'

mongo.connect(url, function(err, db) {
  if (err) throw err
  var parrots = db.collection('parrots')
  parrots.find({
    age: {
      $gt: +age
    }},{
    	age:1,
   		name:1,
   		_id:0
    }).toArray(function(err, docs) {
    if (err) throw err
    console.log(docs)
    db.close()
  })
})

