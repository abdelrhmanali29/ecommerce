const mongoose = require('mongoose');

const isMongoId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const isNumber = (number) => {
  return !isNaN(number);
};

module.exports = {
  isMongoId,
  isNumber,
};
