// Require Express
var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
// DB
//var mongoose        = require('mongoose');
// DB Collection
//var Quote       = require(__dirname + '/server/models/quote');
// DB config
//var configDB = require('./config/database.js');
// Connect DB
//mongoose.connect(configDB.url);

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
require(__dirname + '/server/routes')(app);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
