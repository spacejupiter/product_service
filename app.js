var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
const logger = require('morgan');
require('dotenv').config();
const app = express();
const cors= require ('cors');
app.use(bodyparser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(cors({
  origin : '*'
}));

//app.use('/',routes);



app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
//app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
 // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
 // res.status(err.status || 500);
 // res.render('error');
//});

module.exports = app;
