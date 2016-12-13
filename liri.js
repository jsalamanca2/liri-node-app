var fs = require('fs');
var Twitter = require('./key.js');
var Spotify = require('spotify');
//For OMDB movie Api
var request = require('request');

//commands to get data from twitter, spotify or movie
var action = process.argv[2];
//
if (action === "my-tweets") {
	var params = {screen_name: 'jsala109 '};
	Twitter.get('statuses/user_timeline', params, function(error, tweets, response){
  	if (!error) {
    console.log(tweets);
 	 }
})
}
