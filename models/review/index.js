// load the things we need
var mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

// define the schema for our catererSchema model
var reviewSchema = mongoose.Schema({
	customerFirstName: String,
	customerID: ObjectId,
	catererID: ObjectId,
	catererName: String,
	customerCity: String,
	customerComment: String,
	customerRating: Number,
}, {
    timestamps: true
});

//Connect to specific database
const db = mongoose.connection.useDb('foodiebee');

// create the model
module.exports = db.model('review', reviewSchema, 'review');