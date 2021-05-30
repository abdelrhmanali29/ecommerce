const schema = {
  type: 'object',
  required: ['name', 'email', 'password', 'passwordConfirm'],
  properties: {
    name: {
      type: 'string',
      minLength: 8,
      maxLength: 30,
    },
    email: {
      type: 'string',
      format: 'email',
    },
    role: {
      type: 'string',
      enum: ['admin', 'user', 'guide'],
    },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 20,
    },
    passwordConfirm: {
      type: 'string',
    },
  },
};

module.exports = schema;
