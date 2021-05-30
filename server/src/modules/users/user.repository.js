const User = require('./user.model');

module.exports = {
  async create(user) {
    const newUser = new User(user);
    await newUser.save();
    newUser.password = undefined;

    return newUser;
  },

  async count(email) {
    const usersCounter = await User.count({ email });

    return usersCounter;
  },

  async find(query, attributes) {
    const user = await User.findOne(query).select(attributes);

    return user;
  },

  async findById(id) {
    const user = await User.findById(id);

    return user;
  },
};
