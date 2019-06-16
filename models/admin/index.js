// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// define the schema for our customerSchema model
var adminSchema = mongoose.Schema({
    adminFirstName: String,
	adminLastName: String,
    adminEmail: String,
    adminPassword: String,
    adminRole: String,
}, {
    timestamps: true
});

// generating a hash
adminSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
adminSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.adminPassword);
};

adminSchema.methods.generateJWT = function() {
  return jwt.sign({
    adminEmail: this.adminEmail,
    id: this._id,
  }, process.env.jwtSecretKey, {expiresIn: '24h'} );
}

//Connect to specific database
const db = mongoose.connection.useDb('foodiebee');

// create the model
module.exports = db.model('admin', adminSchema, 'admin');