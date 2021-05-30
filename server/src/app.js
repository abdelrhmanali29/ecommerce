const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./utils/appError');
const errorHandler = require('./middlewares/errorHandler');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const userRouter = require('./modules/users/user.routes');
const imageRouter = require('./modules/images/image.routes.js');
const productRouter = require('./modules/products/product.routes');

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

app.use(morgan());

app.get('/', (req, res) => {
  res.status(200).send('Hello from server..');
});

// app.use('/', imageRouter);
app.use('/users', userRouter);
app.use('/images', imageRouter);
app.use('/products', productRouter);

// Handle not defined routes
app.all('*', (req, res, next) => {
  // send json response
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl}`,
  // });

  // send an error
  // const err = new Error(`Can't find ${req.originalUrl}`);
  // err.statusCode = 404;
  // err.status = 'fail';
  // next(err);
  // use AppError
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

// Global our error handler
app.use(errorHandler);

module.exports = app;
