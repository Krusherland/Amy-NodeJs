var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var session = require('express-session');
var pool = require('./models/dataBase');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var artistRouter = require('./routes/artist');
var musicRouter = require('./routes/music');
var storeRouter = require('./routes/store');
var accountRouter = require('./routes/account');
var cartRouter = require('./routes/cart');
var loginRouter = require('./routes/admin/login'); 
var newsletterRouter = require('./routes/admin/newsletter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: '12w45qe1qe4q1eq54eq5',
  resave: false,
  saveUninitialized: true,
}))

secured = async (req, res, next) => { 
  try {
    console.log(req.session.userId);
    if (req.session.userId) {
      next();
      } else {
        res.redirect('/admin/login');
      }
    } catch (error) {
      console.error(error);
  }
}

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/artist', artistRouter);
app.use('/music', musicRouter);
app.use('/store', storeRouter);
app.use('/account', accountRouter);
app.use('/cart', cartRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/newsletter', secured, newsletterRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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