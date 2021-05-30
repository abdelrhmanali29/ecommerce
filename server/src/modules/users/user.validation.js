const schema = require('./user.schema');
const Ajv = require('ajv').default;
const AjvFormats = require('ajv-formats');
const ajv = new Ajv({ allErrors: true });
AjvFormats(ajv, ['date', 'time', 'date-time', 'email', 'url']);

const validation = (user) => {
  let validate = ajv.compile(schema);

  const valid = validate(user);
  const errors = validate.errors;

  return { valid, errors };
};

module.exports = { validation };
