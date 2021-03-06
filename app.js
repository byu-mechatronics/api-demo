/******************************************************************************
 *                          MEAN Skeleton Example
 ******************************************************************************
 * Here is some information about my app.
 *
 * This app also exposes a RESTful API for data manipulation.
 *
**/

// ----------------------------------------------------------------------------
// Requires
// ----------------------------------------------------------------------------
var express     = require('express');               // Easy API routing
var app         = express();                        // Create the app
var bodyParser  = require('body-parser');           // Parses POST JSON automagically
var morgan      = require('morgan');                // Logging for dev
var path        = require('path');                  // filesystem goodies

var api         = require('./app/api');             // API routes

var port        = process.env.PORT || 8080;         // If no env var set, DEV mode

// ----------------------------------------------------------------------------
// Configuration
// ----------------------------------------------------------------------------

global.__base = __dirname + '/';                    // so child modules can access root

app.use(bodyParser.json());                         // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan('dev'));                             // For request logging

// ----------------------------------------------------------------------------
// Routes
// ----------------------------------------------------------------------------

app.use('/api', api);                                           // all API requests will be http://host.com/api/...

// ----------------------------------------------------------------------------
// Listen (start app: `node app.js`)
// ----------------------------------------------------------------------------

app.listen(port);
console.log('Server started on port ' + port);