const repository = require('./image.repository');
const multer = require('multer');
const { Image } = require('./image.model');
const AppError = require('../../utils/appError');
const cloudinaryStorage = require('../../utils/cloudinary');
const catchAsync = require('../../utils/catchAsync');
const { isMongoId } = require('../../utils/validation');

module.exports = {
  upload() {
    const acceptedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    const multerFilter = (req, file, cb) => {
      if (acceptedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
      }
    };
    const upload = multer({
      storage: cloudinaryStorage,
      fileFilter: multerFilter,
    });
    return upload.fields([{ name: 'images', maxCount: 4 }]);
  },

  get() {
    const imagesIds = resources.images;
    console.log(imagesIds);
    imagesIds.forEach((id) => {
      if (!isMongoId(id)) return new AppError('Invalid mongo id.', 400);
    });

    return catchAsync(async (req, res, next) => {
      const image = await Image.findById(req.params.imageId);
      if (!image) return next(new AppError('No image found.', 400));
      res.status(200).json({ image });
    });
  },

  async getInstanceImages(images) {
    const newImages = await repository.getInstanceImages(images);

    return newImages;
  },
  async saveImages(images, productId) {
    images.forEach(async (img) => {
      img.product = productId;
      await img.save();
    });
  },

  async createResources(images) {
    console.log('images', images);

    const imagesIds = images.map((image) => image._id);
    const resources = { images: imagesIds };

    console.log(imagesIds);
    imagesIds.forEach((id) => {
      if (!isMongoId(id)) return new AppError('Invalid mongo id.', 400);
    });

    const response = await repository.create(resources);
    return response;
  },
};
