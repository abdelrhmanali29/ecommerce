const schema = {
  type: 'object',
  required: ['name', 'slug', 'price'],
  properties: {
    name: {
      type: 'string',
    },
    slug: {
      type: 'string',
    },
    price: {
      type: 'number',
    },
    quantity: {
      type: 'number',
    },
    description: {
      type: 'string',
    },
    offer: {
      type: 'number',
    },
    rating: {
      type: 'number',
    },
  },
};

module.exports = schema;
