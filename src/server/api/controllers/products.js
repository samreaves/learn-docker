/**
 * @name Products Service
 * @file products.js
 * @description Provides endpoints to product data 
 * @author Sam Reaves
 * @date November 18, 2015
 */

/*
	Initialization
 */

// Initialize express, API route and products model
var express = require('express'),
	products_model = require('../models/products'),
    products_route = express.Router();


/*
	Public Endpoints
 */


// Route that grabs all products
// Verifies that product exists before returning info
products_route.get('/', function(req, res) {

	// Grab products from products model
	products_model.getAllProducts().then(function(products) {

		// Send product data in json format
		res.status(200).send(JSON.stringify(products));
	}, 
	function(err) {
		res.status(500).end("Problem grabbing products");
	});
});



// Route that grabs productname from products
// Verifies that product exists before returing info
products_route.get('/:id', function(req, res) {

	// Cache productname from request
	var product_id = req.params.id;

	// Grab product with request's productname
	products_model.getProductByID(product_id)
		.then(function(product) {
			
			// If product doesn't exist
			if (!product) {
				res.status(404).end("Product does not exist");
			}

			// If product exists
			else {

				// Send product data in json format
				res.status(200).send(JSON.stringify(product));
			}
		})
		.catch(function(error) {
			console.error(error);
			res.status(404).end("User does not exist");
		});
});


module.exports = products_route;