/**
* JUGGLING ASYNC
* Exercise 9 of 13
*
* This problem is the same as the previous problem (HTTP COLLECT) in that you need to use http.get(). 
* However, this time you will be provided with three URLs as the first three command-line arguments.
*
* You must collect the complete content provided to you by each of the URLs and print it to the console (stdout). 
* You don't need to print out the length, just the data as a String; one line per URL. 
* The catch is that you must print them out in the same order as the URLs are provided to you as command-line arguments.
*/

var http = require('http');

var out = ['-','-','-'];
var endedRequests = 0;

function req(ind){
	http.get(process.argv[ind+2],function(response){
		response.setEncoding('utf8');
		var outputStr = '';
		response.on('data',function(data){
			outputStr += data;
		});
		response.on('error',function(err){
			console.error(err);
		});
		response.on('end',function(){
			endedRequests++;
			out[ind] = outputStr;
			if(endedRequests === 3)
				out.forEach(function(el){
					console.log(el);
				})
		})
	});
};

out.forEach(function(el,i){
	req(i);
});
