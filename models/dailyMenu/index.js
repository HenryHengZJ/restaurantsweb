// load the things we need
var mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

var districtSchema = mongoose.Schema({
	catererID: ObjectId,
	district: String,
	city: String
});
 
// define the schema for our catererSchema model
var dailyMenuSchema = mongoose.Schema({
	date: String,
	caterers: [districtSchema],
}, {
    timestamps: true
});

//Connect to specific database
const db = mongoose.connection.useDb('foodiebee');

// create the model
module.exports = db.model('dailyMenu', dailyMenuSchema, 'dailyMenu');