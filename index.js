// Require Express
var cors = require('cors');

var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var paypal          = require('paypal-rest-sdk');

if(process.env.ppClientID && process.env.ppSecret) {
  var config = {
    "port" : 5000,
    "api" : {
    'mode': 'live',
    "client_id" : process.env.ppClientID,
    "client_secret" : process.env.ppSecret}
  };
} else {
  var config = {
    "port" : 5000,
    "api" : {
    'mode': 'sandbox',
    "client_id" : 'AdDwDI2S4MYLBSAgouMbWywf9AxT-3XnZVPA9L7395vzaRXlMLfdVUzso8d8WXr3II_CM7jqvbYHgLqy',
    "client_secret" : 'EG8_fhdki556EQ3b4S4JqyyDiY2nllfvokIoX-e1MwLpBAGW2uWGp1-xdd-5LSCvGEh6O9FLMvi4yXc8'}
  };
}

var rest            = require('restler');

var utils = {};
utils.paypal = paypal;
utils.config = config;
utils.rest = rest;


//enable cors
app.use(cors({
'allowedHeaders': ['sessionId', 'Content-Type'],
'exposedHeaders': ['sessionId'],
'origin': '*',
'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
'preflightContinue': false
}));

// Set Port
app.set('port', (process.env.PORT || 5002));

// Set Web Visible Path
app.use(express.static(__dirname + '/public'));



// Need for Posting Data
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Get Server Side Main Index
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// routes
require(__dirname + '/server/routes')(app, utils);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
