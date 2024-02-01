const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');
const User = require('../user.model'); // Base user model

const gallerySchema = mongoose.Schema(
    {
        bio: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
        discriminatorKey: 'gallery',
    },
);

gallerySchema.plugin(toJSON);
gallerySchema.plugin(paginate);

const Gallery = User.discriminator('Gallery', gallerySchema);

module.exports = Gallery;
