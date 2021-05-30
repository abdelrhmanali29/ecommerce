const service = require('./product.service');
const imageService = require('../images/image.service');
const { Image } = require('../images/image.model');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const slugify = require('slugify');

module.exports = {
  create() {
    return catchAsync(async (req, res, next) => {
      // finish saving product image
      // create category
      // create shop

      const product = {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        offer: req.body.offer,
        rating: req.body.rating,
        description: req.body.description,
        slug: req.body.slug,
      };
      console.log(product);
      const response = await service.create(product, next);

      return res.status(200).send(response);
    });
  },

  list() {
    return catchAsync(async (req, res, next) => {
      const response = await service.list(req.query);
      return res.status(200).send(response);
    });
  },

  delete() {
    return catchAsync(async (req, res, next) => {
      const user = await service.delete(req.params.id);

      if (!user) return next(new AppError('cannot find doc with that id', 404));

      res.status(204).send();
    });
  },
};
