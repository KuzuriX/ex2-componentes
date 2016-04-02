// REvista model

'use strict';

let mongoose = require('mongoose'),
		Schema = mongoose.Schema;

let	RevistaSchema = new Schema({
	id: String,
	name: String,
	year: String,
	volume: String
});

module.exports = mongoose.model('Revista', RevistaSchema);


