/**
 * @name Products Model
 * @file products.js
 * @description Provides product model
 * @author Sam Reaves
 * @date November 18, 2015
 */


/*
	Initialization of private cached data
 */

// Initialize express, file system, lodash
var db = require('../../db/db.js'),
	Q = require('q');
    


/*
	Methods
*/

/**
 * @name getAllProducts
 * @description Provides endpoint to all product data 
 *
 * @returns {array} list_of_users List of product objects
 * 
 * @author Sam Reaves
 * @date November 18, 2015
 */
module.exports.getAllProducts = function() {

	// Create promise
	var deferred = Q.defer();
	
	// Resolve with all products
	deferred.resolve(db.products);	

	// Return promise
	return deferred.promise;
}


/**
 * @name getProduct by ID
 * @description Provides endpoints to product data by ID 
 *
 * @param {integer} product_id Product ID 
 * @returns {object} product Product data object
 * 
 * @author Sam Reaves
 * @date November 18, 2015
 */
module.exports.getProductByID = function(product_id) {

	// Create promise
	var deferred = Q.defer();
	
	// For each product
	db.products.map(function(product) {



		// If this product's id matches product_id, resolve promise, else do nothing
		if (product.id === product_id) deferred.resolve(product);
	})

	// If no match, reject the promise
	deferred.reject();
	

	// Return promise
	return deferred.promise;
}