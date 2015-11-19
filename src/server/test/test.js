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
      .expect('Content-Type', /html/)
  		.expect(200, done);
	});

  // Make sure server responds to products endpoint and with correct response
	it('responds to /api/products', function testProducts(done) {
	    
      // Mock required API response
      var products = [
        {
          id: 1,
          name: "BRnr Cord",
          dimensions: "4'x 4'x 8'",
          price: 500, 
          volume: "128 cubic feet"
        },
        {
          id: 2,
          name: "BRnr Half Cord",
          dimensions: "4'x 4'x 4'",
          price: 350, 
          volume: "64 cubic feet"
        },
        {
          id: 3,
          name: "BRnr Face Cord",
          dimensions: "4'x 8'x 16\"",
          price: 310, 
          volume: "42.6 Cubic Feet"
        },
        {
          id: 4,
          name: "BRnr Quarter Cord",
          dimensions: "4'x 6'x 16\"",
          price: 275, 
          volume: "64 cubic feet"
        },
        {
          id: 5,
          name: "BRnr White Birch Firewood",
          dimensions: "4'x 4'x 16\"",
          price: 275, 
          volume: "42.6 Cubic Feet"
        }
      ];

      // Fire off request
      request(server)
  		.get('/api/products')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(products, done);
	});


  	// Make sure server responds to products by id endpoint and with correct response
  	it('responds to /api/products/:product_id', function testProductsByID(done) {
  	    
        // Mock required response 
        var product = {
          id: 1,
          name: "BRnr Cord",
          dimensions: "4'x 4'x 8'",
          price: 500, 
          volume: "128 cubic feet"
        };

        // Fire off request
        request(server)
    		.get('/api/products/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(product, done)
  	});

  	// Make sure server does not responds to bullshit endpoint
  	it('404s on /api/bullshit', function testBullshitEndpoint(done) {
  	    request(server)
    		.get('/api/bullshit')
    		.expect(404, done);
  	});

});