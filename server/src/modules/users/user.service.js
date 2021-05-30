const repository = require('./user.repository');
const AppError = require('../../utils/appError');
const { validation } = require('./user.validation');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const signToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtEpiresIn,
  });
};

module.exports = {
  async create(user, next) {
    const { valid, errors } = validation(user);
    if (!valid) {
      return next(new AppError('validation failed', 400, errors));
    }

    const usersCounter = await repository.count(user.email);
    if (usersCounter > 0) {
      return next(new AppError('Email should be unique', 400));
    }
    const newUser = await repository.create(user);
    const token = signToken(newUser.id);

    return { token, newUser };
  },

  async login(email, password, next) {
    // 1- check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password.', 400));
    }

    // 2- check if user exists && password is correct
    // const user = await User.findOne({ email }).select('+password');
    const user = await repository.find({ email }, '+password');
    const userPassword = await user.isPasswordCorrect(password, user.password);
    console.log(userPassword);

    if (!user || !userPassword) {
      console.log('435436666666666666666666666666');
      return next(new AppError('Incorrect email or password.', 401));
    }

    // 3- If everything is OK, send token to client
    const token = signToken(user.id);
    return token;
  },

  async protect(token, next) {
    // 1- check if token is provided
    if (!token) {
      return next(
        new AppError('You are not logged in. Please log in to get access.', 401),
      );
    }

    // 2- Verfication token if not valid it will fire an error
    const decoded = await promisify(jwt.verify)(token, config.jwtSecret);

    // 3- Check if user still exists
    const currentUser = await repository.findById(decoded.id);

    if (!currentUser) {
      return next(
        new AppError('The user belonging to this token does no longer exist.', 401),
      );
    }

    // 4- Check if user changed password after the token was issued
    if (currentUser.isPasswordChangedAfter(decoded.iat)) {
      return next(
        new AppError('User recently changed password! Please log in again.', 401),
      );
    }

    // 3- If everything is OK, retrun current user
    return currentUser;
  },
};
