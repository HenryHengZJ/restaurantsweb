// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

// define the schema for our newCatererSchema model
var newCatererSchema = mongoose.Schema({
    catererName: String,
    catererPhoneNumber: String,
    catererEmail: String,
    catererAddress: String,
    catererStatus: String,
}, {
    timestamps: true
});

//Connect to specific database
const db = mongoose.connection.useDb('foodiebee');

// create the model
module.exports = db.model('newCaterer', newCatererSchema, 'newCaterer');