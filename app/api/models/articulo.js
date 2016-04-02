// Articulo model

'use strict';

let mongoose = require('mongoose'),
		Schema = mongoose.Schema;

let	ArticuloSchema = new Schema({
	name: String,
	tittle: String,
	id_rev: String
});

module.exports = mongoose.model('Articulo', ArticuloSchema);


