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
	fs = require('fs'),
	path = require('path'),
    api_route = express.Router();

api_route.get("/", function(req, res) {
	res.send(404);
})
api_route.use('/products', products);

module.exports = api_route;