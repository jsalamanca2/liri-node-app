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
//For data log
var logData = "";
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

//function to get last 20 tweets from twitter module, well try for the 20 tweets. 
function getTweets() { 
//Create a new Twitter instance
var twitter = new Twitter(keys.twitterKeys);
twitter.get('statuses/user_timeline', {screen_name: 'jsala109', count: 20}, function(err, tweets, response){
  if (!err && response.statusCode == 200) {
  	console.log("*" + "*" + "My SICK ASS Tweets" + "*" + "*")
  	for (var i = 0; i < tweets.length; i++) {
  		console.log(tweets[i].created_at + " " + tweets[i].text)
  	//(TRying for the logging)	
  	logData = [tweets[i].created_at + " " + tweets[i].text + "," + " "];
  	writeLog();
  	}
  }
});
}

//function to search Spotify to display results
function searchSpotify() {
var value = process.argv[3] || "whats my age again"; // default
spotify.search({ type: 'track', query: value }, function(err, data) {
    if (!err) {
  		console.log("*" + "* " + "Spotify Results" + "*" + "*")
    	console.log('---Artist(s): ' + data.tracks.items[0].artists[0].name)
        console.log('---Song Name: ' + data.tracks.items[0].name);
        console.log('---Preview Link: ' + data.tracks.items[0].preview_url);
        console.log('---Album: ' + data.tracks.items[0].album.name);
        logData = {Artists: data.tracks.items[0].artists[0].name, songName: data.tracks.items[0].name, previewLink: data.tracks.items[0].preview_url, Album: data.tracks.items[0].album.name};
		writeLog();
    }
 });
}
//funtion to search OMBD results for movies
function searchMovie() {
	var value = process.argv[3] || "Mr. Nobody"; //Default if nothing put in
	var options =  { 
		url: 'http://www.omdbapi.com/',
		qs: {
			t: value,
			plot: 'short',
			r: 'json',
			tomatoes: true
		}
	}
	request(options, function(err, response, body) {
	if (!err && response.statusCode == 200) {
		body = JSON.parse(body);
  		console.log("*" + "*" + "OMDB Results" + "*" + "*")
		console.log("---Title: " + body.Title);
		console.log("---Year: " + body.Year);
		console.log("---IMDB Rating: " + body.imdbRating);
		console.log("---Country: " + body.Country);
		console.log("---Language: " + body.Language);
		console.log("---Plot: " + body.Plot);
		console.log("---Actors :" + body.Actors);
		console.log("---Rotten Tomatoes Rating: " + body.tomatoRating);
		console.log("---Rotten Tomatoes URL: " + body.tomatoURL);
		logData = {Title: body.Title, Year: body.Year, ImdbRating: body.imdbRating, Country: body.Country, Language: body.Language, Plot: body.Plot, Actors: body.Actors, rottenTomatoesRating: body.tomatoRating, rottenTomatoesUrl: body.tomatoURL};
		writeLog();
	}
})
}
//function to read text file and execute arguments
function readFileExecute() {
	//reads text files and returns contents to data
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (!error) {
	    // split to make arguments accessible
	    var textArgs = data.split(',');
	    
	    // store arguments as var defined in switch function
	 	action = textArgs[0];
	 	value = textArgs[1];
	 	processArgs();
		}

	})
};

//function to write to a log.txt
function writeLog() {
	//readsfiles and returns to data
	fs.appendFile('log.txt', JSON.stringify(logData, null, "\t"), (err) => {
	  if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
})
};
