var mongo = require('mongodb').MongoClient

var sz = process.argv[2];

var url = 'mongodb://localhost:27017/learnyoumongo';

mongo.connect(url, function(err, db) {
  if (err) throw err
  var prices = db.collection('prices');
  prices.aggregate([
  	{
  		$match : {size : sz}
  	},{
  		$group : {
  			_id : 'average',
  			average : {
  				$avg : '$price'
  			}
  		}
  	}
  ]).toArray(function(err, result) {
    if (err) throw err
    var s = Math.round(result[0].average*100)/100;
    console.log(s.toFixed(2));
    db.close()
  });
});


