const schema = require('./product.schema');
const Ajv = require('ajv').default;
const AjvFormats = require('ajv-formats');
const ajv = new Ajv({ allErrors: true });
AjvFormats(ajv, ['date', 'time', 'date-time', 'email', 'url']);

const validation = (product) => {
  let validate = ajv.compile(schema);

  let errors = [];
  let valid = validate(product);
  errors = validate.errors;

  console.log('ffff', valid);
  console.log('PRO', product);

  if (!valid) {
    errors.forEach((error) => {
      error.dataPath = error.dataPath.split('/')[1];
    });
  }

  return { valid, errors };
};

module.exports = { validation };
