var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
// var about = require('./routes/about');
var travel = require('./routes/travel_routes');
var client = require('./routes/client_routes');
var airline = require('./routes/airline_routes');
var flight = require('./routes/flight_routes');
var trip = require('./routes/trip_routes');
var payment = require('./routes/payment_routes');
var tripflight = require('./routes/tripflight_routes');
var travelclient = require('./routes/travelclient_routes');
var travelairline = require('./routes/travelairline_routes');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// app.use('/about', about);
app.use('/travel', travel);
app.use('/client', client);
app.use('/airline', airline);
app.use('/flight', flight);
app.use('/trip', trip);
app.use('/payment', payment);
app.use('/tripflight', tripflight);
app.use('/travelclient', travelclient);
app.use('/travelairline', travelairline);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
