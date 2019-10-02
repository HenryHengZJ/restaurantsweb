// load the things we need
var mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;
 
// define the schema for our companySchema model
var companySchema = mongoose.Schema({
	companyName: String,
	companyAddress: String,
	companyCity: String,
	companyDistrict: String,
	location: { type: {type:String}, coordinates: [Number]},
}, {
    timestamps: true
});

//Connect to specific database
const db = mongoose.connection.useDb('foodiebee');

// create the model
module.exports = db.model('company', companySchema, 'company');