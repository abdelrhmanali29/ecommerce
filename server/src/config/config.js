const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../../.env' });

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,

  jwtSecret: process.env.JWT_SECRET,
  jwtEpiresIn: process.env.JWT_EXPIRES_IN,

  email: process.env.EMAIL_USERNAME,
  password: process.env.EMAIL_PASSWORD,

  dbURI:
    'mongodb://' +
      (process.env.IP || 'localhost') +
      ':' +
      (process.env.MONGO_PORT || '27017') +
      '/ecommerce' ||
    process.env.DB_URL ||
    process.env.MONGO_HOST,
};

module.exports = config;
