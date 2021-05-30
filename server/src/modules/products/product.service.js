const repository = require('./product.repository');
const AppError = require('../../utils/appError');
const { validation } = require('./product.validation');
const catchAsync = require('../../utils/catchAsync');
const { isMongoId } = require('../../utils/validation');

module.exports = {
  async create(product, next) {
    const { valid, errors } = validation(product);

    if (!valid) {
      return next(new AppError('validation failed', 400, errors));
    }
    const response = await repository.create(product);
    return response;
  },

  async list(query) {
    // TODO: validate query
    const response = await repository.list(query);
    return response;
  },

  async delete(id) {
    console.log(id);
    const product = await repository.delete(id);

    return product;
  },
};
