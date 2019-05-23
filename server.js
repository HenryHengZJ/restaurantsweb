// set up ===============================================================
require('dotenv').config()
const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;
const dev = process.env.NODE_DEV !== 'production' //true false
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const next = require('next')
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler() //part of next config
var cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
var mail = require('./nodeMailerWithTemp');
require('./middleware/passport')(passport);

// DB configuration ===============================================================
const dbRoute = process.env.DB_URI;
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

nextApp.prepare().then(() => {
  const app = express();
  // express code here
  // (optional) only made for logging and
  // bodyParser, parses the request body to be a readable json format
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(logger("dev"));
  app.use(cookieParser());
	app.use(passport.initialize());
  //app.use(express.static(path.join(__dirname, 'client/build')));

  // router files ===============================================================
	var testRoutes   = require('./routes/test');
	var authRoutes   = require('./routes/auth');
  var catererPublishedRoutes   = require('./routes/catererPublished');
  var catererRoutes   = require('./routes/caterer');
	var customerRoutes   = require('./routes/customer');
	var menuPublishedRoutes   = require('./routes/menuPublished');
	var cartRoutes   = require('./routes/cart');

	// routes ======================================================================
	app.use('/test', testRoutes);
  app.use('/auth', authRoutes);
  app.use('/catererPublished', catererPublishedRoutes);
  app.use('/caterer', catererRoutes);
	app.use('/customer', customerRoutes);
	app.use('/menuPublished', menuPublishedRoutes);
  app.use('/cart', cartRoutes);

  app.post('/postmessage', (req,res) => {
    var bodymsg = req.body
    mail.sendCustomerMessageEmail('/templates/customer_message/email.html', bodymsg);
    res.status(200).json({});
  })  
 
  app.get('/searchcaterer', (req,res) => {
    return nextApp.render(req, res, '/SearchCaterer',  req.query )
  })  

  app.get('/catererdetail/:id', (req,res) => {
    return nextApp.render(req, res, '/CatererDetail', { id: req.params.id })
  }) 

  app.get('/login', (req,res) => {
    return nextApp.render(req, res, '/Login', req.query)
  }) 

  app.get('/register', (req,res) => {
    return nextApp.render(req, res, '/Register')
  }) 

  app.get('/caterersignup', (req,res) => {
    return nextApp.render(req, res, '/CatererSignUp')
  })
  
  app.get('/catererlogin', (req,res) => {
    return nextApp.render(req, res, '/CatererLogin')
  })

  app.get('/checkout/:id', (req,res) => {
    return nextApp.render(req, res, '/DeliveryConfirmation', { id: req.params.id })
  }) 

  app.get('/userprofile/:userprofilepage', (req,res) => {
    return nextApp.render(req, res, '/UserProfile', { userprofilepage: req.params.userprofilepage })
  }) 

  app.get('/forgotpassword', (req,res) => {
    return nextApp.render(req, res, '/ForgotPassword')
  })  

  app.get('/resetpassword/:resetPasswordToken', (req,res) => {
    return nextApp.render(req, res, '/ResetPassword',  { resetPasswordToken: req.params.resetPasswordToken } )
  })  

  app.get('/aboutus', (req,res) => {
    return nextApp.render(req, res, '/AboutUs')
  })  

  app.get('/contactus', (req,res) => {
    return nextApp.render(req, res, '/ContactUs')
  })  

  app.get('*', (req,res) => {
    return handle(req,res) // for all the react stuff
  })  

  //start server
  app.listen(port, (req, res) => {
    console.log( `nextjs server listening on port: ${port}`);
  })
})
