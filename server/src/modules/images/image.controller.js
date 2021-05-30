const multer = require('multer');
const { Image } = require('./image.model');
const service = require('./image.service');

exports.upload = service.upload();
