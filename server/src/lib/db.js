const mongoose = require('mongoose');

module.exports = async (url) => {
  console.log(url);
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false, // Make Mongoose use `findOneAndUpdate()`. Note that this option is `true` by default, you need to set it to false.
    })
    .then();
};
