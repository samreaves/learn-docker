/**
 * @name Server tests
 * @file test.js
 * @description Tests server
 * @author Sam Reaves
 * @date November 18, 2015
 */


// Require asynchronous testing library
var request = require('supertest');

// Test server
describe('server tests', function () {
    
	// Create server container variable
	var server;

	// Before each unit test, require server
	beforeEach(function () {
	    
	    // Delete cached server in require
	    delete require.cache[require.resolve('../app')];

		// Start server
	    server = require('../app');
	});

	// After each test
	afterEach(function (done) {
	    
	    // Stop server
	    server.close(done);

	});
    
	// Make sure server responds to root
    it('responds to /', function testRoot(done) {
  	    request(server)
    		.get('/')
    		.expect(200, done);
  	});

});