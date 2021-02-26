const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const mw = require('./utils/middlewares/auth.middleware');
dotenv.config();

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth.route');
const ordersRouter = require('./routes/admin/orders.route');
const customersRouter = require('./routes/admin/customers.route');
const productsRouter = require('./routes/admin/products.route');

const app = express();

// view engine setup
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin/orders', mw.securedAdmin, ordersRouter);
app.use('/api/admin/customers', mw.securedAdmin, customersRouter);
app.use('/api/admin/products', mw.securedAdmin, productsRouter);

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
