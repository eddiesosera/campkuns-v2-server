const Joi = require('joi');
const { password, objectId } = require('./custom.validation');
const artistValidation = require('./users/artist.validation');
const galleryValidation = require('./users/gallery.validation');
const adminValidation = require('./users/admin.validation');
const explorerValidation = require('./users/explorer.validation')

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    username: Joi.string().required(),
    role: Joi.string().required().valid('artist', 'gallery', 'organizer', 'explorer', 'admin'),
    // ...galleryValidation,
    ...artistValidation,
    ...adminValidation
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    artistId: Joi.string().custom(objectId),
  }).or('userId', 'artistId', 'adminId', 'galleryId', 'explorerId').required(),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    adminId: Joi.string().custom(objectId),
    artistId: Joi.string().custom(objectId),
  }).or('userId', 'adminId', 'artistId', 'galleryId', 'explorerId').required(),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
      role: Joi.string().valid('artist', 'gallery', 'organizer', 'explorer', 'admin'),
      ...artistValidation,
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    artistId: Joi.string().custom(objectId),
  }).or('userId', 'galleryId', 'artistId', 'adminId', 'explorerId').required(),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
