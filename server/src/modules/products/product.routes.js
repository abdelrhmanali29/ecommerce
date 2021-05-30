const express = require('express');
const controller = require('./product.controller');
const imageController = require('../images/image.controller');
const authController = require('../users/auth.controller');

const router = express.Router();

router
  .route('/')
  .post(controller.create())
  .get(controller.list());

router
  .route('/:id')
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    controller.delete(),
  );

module.exports = router;
