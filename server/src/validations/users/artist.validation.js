const Joi = require('joi');

const artistValidation = {
    bio: Joi.string(),
}

module.exports = artistValidation