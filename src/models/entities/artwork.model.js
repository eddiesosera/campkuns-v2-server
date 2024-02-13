const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const artworkSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

    },
    {
        timestamps: true, artworkSchema
    },
);

// add plugin that converts mongoose to json
artworkSchema.plugin(toJSON);
artworkSchema.plugin(paginate);

/**
 * @typedef Artwork
 */
const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;
