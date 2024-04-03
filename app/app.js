var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var app = express();

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dbRouter = require('./routes/database');
var tradeRouter = require('./routes/trade');
var postsRouter = require('./routes/posts');
var commentsRouter = require('./routes/comments');
var ratingRouter = require('./routes/ratings');
var ratesRouter = require('./routes/rates');
var cardsRouter = require('./routes/cards');
var cardTypesRouter = require('./routes/cardTypes');
var mysql = require('mysql2');
const port = 3001;

app.use('/users', usersRouter);
app.use('/', dbRouter);
app.use('/trade', tradeRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/cards', cardsRouter);
app.use('/ratings', ratingRouter);
app.use('/rates', ratesRouter);
app.use('/cardTypes', cardTypesRouter);

// connection.end()
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS
});

connection.connect();


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});


app.get('/tables/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/tables.html'));
});

app.get('/userpage/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/userpage.html'));
});

app.get('/reviewpage/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/reviewpage.html'));
});

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
  res.send( { "title" :  res.locals.error});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;
