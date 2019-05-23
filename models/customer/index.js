// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

// define the schema for our customerSchema model
var customerSchema = mongoose.Schema({
    customerFirstName: String,
	customerLastName: String,
    customerEmail: String,
	customerPassword: String,
    customerPhoneNumber: String,
    customerAddress: String,
    customerCity: String,
    customerCounty: String,
    customerCountry: String,
    customerOrderID: [String],
    status: {
        type: String,
        default: "new"
    },
    statusUpdated: {
        type : Date, 
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, {
    timestamps: true
});

// generating a hash
customerSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
customerSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.customerPassword);
};

customerSchema.methods.generateJWT = function() {
  return jwt.sign({
    customerEmail: this.customerEmail,
    id: this._id,
  }, 'FoodieBeeSecretKey', {expiresIn: '24h'} );
}

//Connect to specific database
const db = mongoose.connection.useDb('foodiebee');

// create the model
module.exports = db.model('customer', customerSchema, 'customer');