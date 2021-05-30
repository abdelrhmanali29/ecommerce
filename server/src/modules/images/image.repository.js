const { Resources, Image } = require('./image.model');
const appError = require('../../utils/appError');

module.exports = {
  async create(resources) {
    const newResources = await Resources.create(resources);

    return {
      status: true,
      statusCode: 200,
      data: newResources,
    };
  },
  async getInstanceImages(images) {
    const newImages = images.map((image) => {
      return new Image({
        name: image.originalname.replace(' ', '-'),
        url: image.path,
        provider: 'cloudinary',
      });
    });

    return newImages;
  },

  async createManyImage(images) {
    const newImages = await Image.insertMany(images);
    return {
      status: true,
      statusCode: 200,
      data: newImages,
    };
  },

  // async getAll() {
  //   const leagues = await League.find().sort({ smId: -1 }).lean();
  //   return {
  //     status: true,
  //     statusCode: 200,
  //     data: leagues,
  //   };
  // },
};
