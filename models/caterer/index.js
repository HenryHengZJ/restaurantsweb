// load the things we need
var mongoose = require('mongoose');

// define the schema for our Photographer model
var catererSchema = mongoose.Schema({
	name: String,
    descrip: String,
    rating: String,
    numofreview: String,
    src: String,
    minimumspend: String,
    deliveryfee: String,
});

//Connect to specific database
const db = mongoose.connection.useDb('TestDB');

// create the model
module.exports = db.model('caterer', catererSchema, 'caterer');