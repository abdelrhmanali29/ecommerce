const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const cloudinary = require('cloudinary').v2;

const imageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    provider: {
      type: String,
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = undefined;
        ret.__v = undefined;
        return ret;
      },
    },
    versionKey: false,
  },
);

const Image = mongoose.model('Image', imageSchema);

const resourcesSchema = new Schema(
  {
    images: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Image',
      },
    ],
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__V;
        return ret;
      },
    },
    versionKey: false,
  },
);

// resourcesSchema middlewares
resourcesSchema.pre('remove', async function () {
  const imgIds = [];
  for (let image of this.images) {
    image = await Image.findOne({ _id: image.toString() });
    const splitUrl = image.url.split('/');
    const publicId = splitUrl[splitUrl.length - 1].split('.')[0];
    const folderName = process.env.API_FOLDER_NAME || 'temp';
    imgIds.push(`${folderName}/${publicId}`);
    image.remove();
  }
  cloudinary.api.delete_resources(imgIds);
});

const Resources = mongoose.model('Resources', resourcesSchema);
module.exports = {
  Image,
  Resources,
};
