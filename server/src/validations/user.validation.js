const Joi = require('joi');
const { password, objectId } = require('./custom.validation');
const artistValidation = require('./users/artist.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    username: Joi.string().required(),
    role: Joi.string().required().valid('artist', 'gallery', 'organizer', 'tourist', 'admin'),
    ...artistValidation,
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
  }).or('userId', 'artistId').required(),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    artistId: Joi.string().custom(objectId),
  }).or('userId', 'artistId').required(),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
      role: Joi.string().valid('artist', 'gallery', 'organizer', 'tourist', 'admin'),
      ...artistValidation,
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    artistId: Joi.string().custom(objectId),
  }).or('userId', 'artistId').required(),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
