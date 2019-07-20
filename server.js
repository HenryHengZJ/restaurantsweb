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
var sm = require('sitemap')
require('./middleware/passport')(passport);

console.log('dev = ', dev)
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
  var sitemap = sm.createSitemap ({
    hostname: 'https://foodiebee.eu',
    cacheTime: 600000,        // 600 sec - cache purge period
    urls: [
      { url: '',  changefreq: 'daily', priority: 0.7 },
      { url: '/aboutus',  changefreq: 'monthly', priority: 0.3 },
      { url: '/contactus',  changefreq: 'monthly',  priority: 0.3 },
      { url: '/login',  changefreq: 'monthly',  priority: 0.3 },
      { url: '/register',  changefreq: 'monthly',  priority: 0.3 },
      { url: '/termscondition',  changefreq: 'monthly',  priority: 0.3 },
      { url: '/privacypolicy',  changefreq: 'monthly',  priority: 0.3 },
      { url: '/caterersignup',  changefreq: 'monthly',  priority: 0.7 },
    ]
  });
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
  var orderRoutes   = require('./routes/order');
  var paymentRoutes   = require('./routes/payment');
  var reviewRoutes   = require('./routes/review');
  var twilioRoutes   = require('./routes/twilio');
  var dailyMenuRoutes = require('./routes/dailyMenu');
  var lunchMenuPublishedRoutes = require('./routes/lunchMenuPublished');

	// routes ======================================================================
	app.use('/test', testRoutes);
  app.use('/auth', authRoutes);
  app.use('/catererPublished', catererPublishedRoutes);
  app.use('/caterer', catererRoutes);
	app.use('/customer', customerRoutes);
	app.use('/menuPublished', menuPublishedRoutes);
  app.use('/cart', cartRoutes);
  app.use('/order', orderRoutes);
  app.use('/payment', paymentRoutes);
  app.use('/review', reviewRoutes);
  app.use('/twilio', twilioRoutes);
  app.use('/dailyMenu', dailyMenuRoutes);
  app.use('/lunchMenuPublished', lunchMenuPublishedRoutes);


  app.get('/sitemap.xml', function(req, res) {
    sitemap.toXML( function (err, xml) {
        if (err) {
          return res.status(500).end();
        }
        res.header('Content-Type', 'application/xml');
        res.send( xml );
    });
  });

  const path = require('path');
  const options = {
    root: path.join(__dirname, '/static'),
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
    }
  };
  app.get('/robots.txt', (req, res) => (
    res.status(200).sendFile('robots.txt', options)
  ));
  
  app.post('/postmessage', (req,res) => {
    var bodymsg = req.body
    mail.sendCustomerMessageEmail('/templates/customer_message_admin/email.html', bodymsg);
    res.status(200).json({});
  }) 

  app.get('/catering', (req,res) => {
    return nextApp.render(req, res, '/CateringLandingPage',  req.query )
  })  
 
  app.get('/searchcaterer', (req,res) => {
    console.log("searchcaterer")
    return nextApp.render(req, res, '/SearchCaterer',  req.query )
  })  

  app.get('/searchlunch', (req,res) => {
    return nextApp.render(req, res, '/SearchLunch',  req.query )
  })  

  app.get('/catererdetail/:id', (req,res) => {
    return nextApp.render(req, res, '/CatererDetail', { id: req.params.id })
  }) 

  app.get('/login', (req,res) => {
    return nextApp.render(req, res, '/Login', req.query)
  }) 

  app.get('/register', (req,res) => {
    return nextApp.render(req, res, '/Register', req.query)
  }) 

  app.get('/caterersignup', (req,res) => {
    return nextApp.render(req, res, '/CatererSignUp')
  })
  
  app.get('/catererlogin', (req,res) => {
    return nextApp.render(req, res, '/CatererLogin')
  })

  app.get('/checkout/:cartID/:catererID', (req,res) => {
    return nextApp.render(req, res, '/CheckOut', { cartID: req.params.cartID, catererID: req.params.catererID })
  }) 

  app.get('/userprofile/:userprofilepage', (req,res) => {
    var returnquery = req.query
    returnquery.userprofilepage = req.params.userprofilepage
    return nextApp.render(req, res, '/UserProfile', returnquery)
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
  
  app.get('/termscondition', (req,res) => {
    return nextApp.render(req, res, '/TermsCondition')
  })  

  app.get('/privacypolicy', (req,res) => {
    return nextApp.render(req, res, '/PrivacyPolicy')
  })  

  app.get('*', (req,res) => {
    return handle(req,res) // for all the react stuff
  })  

  //start server
  app.listen(port, (req, res) => {
    console.log( `nextjs server listening on port: ${port}`);
  })
})
