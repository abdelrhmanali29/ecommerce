const express = require('express');
const controller = require('./image.controller');

const router = express.Router();

router.route('/').post(controller.upload);

module.exports = router;
