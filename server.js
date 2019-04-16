// set up ===============================================================
require('dotenv').config()
require('newrelic');
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
  //app.use(express.static(path.join(__dirname, 'client/build')));

  // router files ===============================================================
  var testRoutes   = require('./routes/test');

  // routes ======================================================================
  app.use('/test', testRoutes);

  app.get('/searchcaterer', (req,res) => {
    var location = "";
    var occasion = "" ;
    if (req.query.location) {
      location = req.query.location
    }
    if (req.query.occasion) {
      occasion = req.query.occasion
    }
    return nextApp.render(req, res, '/SearchCaterer', { location: location, occasion: occasion })
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

  app.get('/deliveryconfirmation', (req,res) => {
    return nextApp.render(req, res, '/DeliveryConfirmation')
  }) 

  app.get('*', (req,res) => {
    return handle(req,res) // for all the react stuff
  })  

  //start server
  app.listen(port, (req, res) => {
    console.log( `nextjs server listening on port: ${port}`);
  })
})
