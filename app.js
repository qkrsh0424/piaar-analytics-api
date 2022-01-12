var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var productReleaseApi = require('./api/v1/product_release/productReleaseApi');
var productApi = require('./api/v1/product/productApi');
var productCategoryApi = require('./api/v1/product_category/productCategoryApi');

var app = express();

const whiteLists = [
  'http://localhost:3000',
  'https://piaar.co.kr',
  'https://www.piaar.co.kr',
  'https://analytics.piaar.co.kr',
];

const corsOptions = {
  origin: function(origin, callback){
  	const isTrue = whiteLists.indexOf(origin) !== -1;
    callback(null, isTrue);
  }
  ,
  credentials: true
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/product-release', productReleaseApi);
app.use('/api/v1/product-category', productCategoryApi)
app.use('/api/v1/product', productApi)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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
