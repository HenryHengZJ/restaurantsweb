// load all the things we need
const passport = require('passport');
const LocalStrategy    = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
require('dotenv').config();

const Customer = require('../../models/customer');

var myLocalConfig = (passport) => {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================


    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('customer-login', new LocalStrategy({
	  usernameField: 'email',
	  passwordField: 'password',
	  passReqToCallback : true
	},
	function(req, email, password, done) {
		if (email)
			email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

		// asynchronous
		process.nextTick(function() {
			Customer.findOne({ 'customerEmail' :  email }, function(err, customer) {
				// if there are any errors, return the error
				if (err)
				{
					return done(err);
				}
				
				// if no customer is found, return the message
				if (!customer)
				{
					return done(null, false);
				}
					
				// check customer's password
				if (!customer.validPassword(password))
				{
					return done(null, false);
				}
					
				// all is well, return customer
				else
				{
					return done(null, customer);
				}	
					
			});
		});

	}));
	
	
	passport.use(new JWTStrategy({
		jwtFromRequest: req => req.cookies.jwt,
		secretOrKey: process.env.jwtSecretKey,
	  },
	  (jwtPayload, done) => {
		if (new Date() > new Date(jwtPayload.expires)) {
		  return done('jwt expired');
		}
		return done(null, jwtPayload);
	  }
	));
	

    
};

module.exports = myLocalConfig;