// set up ===============================================================
const express = require('express');
const app = express();
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
require('dotenv').config()

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

  app.get('*', (req,res) => {
    return handle(req,res) // for all the react stuff
  })  

  app.get('/searchcaterer/:occasion', (req,res) => {
    return app.render(req, res, '/searchcaterer', { occasion: req.params.occasion })
  })  

  app.get('/catererdetail/:id', (req,res) => {
    return app.render(req, res, '/catererdetail', { id: req.params.id })
  }) 

  app.get('/login', (req,res) => {
    return app.render(req, res, '/login')
  }) 

  app.get('/register', (req,res) => {
    return app.render(req, res, '/register')
  }) 

  app.get('/caterersignup', (req,res) => {
    return app.render(req, res, '/caterersignup')
  }) 

  //start server
  app.listen(port, (req, res) => {
    console.log( `nextjs server listening on port: ${port}`);
  })
})

// (optional) only made for logging and
/* bodyParser, parses the request body to be a readable json format
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// router files ===============================================================
var testRoutes   = require('./routes/test');

// routes ======================================================================
app.use('/test', testRoutes);

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));

//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}
//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'client/public/index.html'));
})

//start server
app.listen(port, (req, res) => {
  console.log( `server listening on port: ${port}`);
})*/