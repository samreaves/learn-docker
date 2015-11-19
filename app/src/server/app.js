/**
 * @name Learn Docker Server
 * @file app.js
 * @description Initializes server. 
 * @author Sam Reaves
 * @date November 18, 2015
 */

// Import Express and initialize server.
var express = require('express'),
	app = module.exports.app = exports.app = express(),
	logger = require('morgan'),
	path = require('path'),
	body_parser = require('body-parser'),
	cors = require('cors'),
	api = require('./api'),
	server,
	host,
	port,
	static_directory = path.join(__dirname, '../client/');


// Use body parser to parse both application/json and application/x-www-form-urlencoded
app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());

// Use Morgan logger
app.use(logger('dev'));

// Set up cross origin resource sharing defaults
app.use(cors());

// Provide API
app.use('/api', api);

// Establish static directory at client/public
app.use(express.static(static_directory));


// Route handler for root - sends current static landing page
app.get('/', function(req, res) {
  res.sendFile(path.join(static_directory, "index.html"));
});

// Server starts listening on port 3000.
server = app.listen(3000, function() {

	host = server.address().address,
  	port = server.address().port;

  	// Logs a message to let dev know we're up and running.
  	console.log('Example app listening at http://%s:%s', host, port);
});

// Export the server for testing
module.exports = server;