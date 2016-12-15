var fs = require('fs');
var keys = require('./key.js');
var Twitter = require('twitter');
var spotify = require('spotify');
//For OMDB movie Api
var request = require('request');

//commands to get data from twitter, spotify or movie
var action = process.argv[2];
// made for the movie and spotify selection
var value = process.argv[3];
// Changed to switch case arguments 
//The cases will tell what function will be run
function processArgs() {
switch(action){
    case 'my-tweets':
        getTweets();
        break;
    case 'spotify-this-song':
        searchSpotify();
        break;
    case 'movie-this':
        searchMovie();
        break;
    case 'do-what-it-says':
    //For the data to be read back
        readFileExecute();
        break;
	}
}

processArgs();

//function to get last 20 tweets from twitter module 
function getTweets() { 
//Create a new Twitter instance
var twitter = new Twitter(keys.twitterKeys);
twitter.get('statuses/user_timeline', {screen_name: 'jsala109', count: 20}, function(err, tweets, response){
  if (!err && response.statusCode == 200) {
  	console.log("*" + "*" + "My Tweets" + "*" + "*")
  	for (var i = 0; i < tweets.length; i++) {
  		console.log(tweets[i].created_at + " " + tweets[i].text)
  	//(TRying for the logging)	logData = [tweets[i].created_at + " " + tweets[i].text + "," + " "];
  	}
  }
});
}

//function to search Spotify to display results
function searchSpotify() {
var value = process.argv[3] || "what's my age again";
spotify.search({ type: 'track', query: value }, function(err, data) {
    if (!err) {
  		console.log("*" + "* " + "Spotify Results" + "*" + "*")
    	console.log('Artist(s): ' + data.tracks.items[0].artists[0].name)
        console.log('Song Name: ' + data.tracks.items[0].name);
        console.log('Preview Link: ' + data.tracks.items[0].preview_url);
        console.log('Album: ' + data.tracks.items[0].album.name);
        //logData = {Artists: data.tracks.items[0].artists[0].name, songName: data.tracks.items[0].name, previewLink: data.tracks.items[0].preview_url, Album: data.tracks.items[0].album.name};
		
    }
 });
}


