/**
 * @name API Index File
 * @file index.js
 * @description Provides interface to API
 * @author Sam Reaves
 * @date November 18, 2015
 */

/*
	Initialization
 */


var products = require('./controllers/products.js');


// Initialize express, file system, lodash, API route and users cache
var express = require('express'),
    api_route = express.Router();

// Send 404 on root/api
api_route.get("/", function(req, res) {
	res.send(404);
})

// Use products endpoint at root/api/products
api_route.use('/products', products);

// Export this route
module.exports = api_route;