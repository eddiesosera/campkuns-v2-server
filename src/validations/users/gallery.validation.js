const Joi = require('joi');

const galleryValidation = {
    bio: Joi.string(),
}

module.exports = galleryValidation;