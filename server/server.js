// Put event listener to catch exceptions before running any code
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  console.log(err);
  process.exit(1);
});

const app = require('./src/app');
const config = require('./src/config/config');
const connect = require('./src/lib/db');

const databaseURL = config.dbURI;
const port = config.port;

/**
 * Graceful start
  App starts (npm start)
  App opens DB connections
  App listens on port
  App tells the load balancer that it’s ready for requests
 */

const mongoose = require('mongoose');
let server;

mongoose
  .connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false, // Make Mongoose use `findOneAndUpdate()`. Note that this option is `true` by default, you need to set it to false.
  })
  .then(() => {
    console.log('conennected to DB');
    server = app.listen(port, () => {
      console.log('server running on:', port);
    });
  });

/**
 * 
 * log memory Usage
const numeral = require('numeral');
setInterval(() => {
  const { rss, heapTotal, heapUsed } = process.memoryUsage();
  console.log(
    'rss',
    numeral(rss).format('0.0 ib'),
    'heapTotal',
    numeral(heapTotal).format('0.0 ib'),
    'heapUsed',
    numeral(heapUsed).format('0.0 ib'),
  );
}, 5000);
*/

/**
 * Graceful shutdown
    Receives a notification to stop
    Asks the load balancer to stop receiving requests
    Finishes all ongoing requests
    Releases all resources (databases, queues…)
    Exits
 */
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
