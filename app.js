var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
// var users = require('./routes/users');
const notes = require('./routes/notes');

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
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/vendor/bootstrap', express.static(
//   path.join(__dirname, 'bower_components', 'bootstrap', 'dist')));
// app.use('/vendor/jquery', express.static(
//   path.join(__dirname, 'bower_components', 'jquery', 'dist')));

app.use('/vendor/bootstrap/css', express.static(path.join(__dirname, 'cyborg')));
app.use('/vendor/bootstrap/fonts', express.static(path.join(__dirname,
  'bower_components', 'bootstrap', 'dist', 'fonts')));
app.use('/vendor/bootstrap/js', express.static(path.join(__dirname,
  'bower_components', 'bootstrap', 'dist', 'js')));
app.use('/vendor/jquery', express.static(path.join(__dirname,
  'bower_components', 'jquery', 'dist')));

app.use('/', index);
// app.use('/users', users);
app.use('/notes', notes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
