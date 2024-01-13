const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');
const User = require('../user.model'); // Import the base user model

const artistSchema = mongoose.Schema(
    {
        // Add artist-specific fields here
        bio: {
            type: String,
            trim: true,
        },
        // Other artist-specific fields
    },
    {
        timestamps: true,
        discriminatorKey: 'artist', // Add this line for discriminator key
    },
);

artistSchema.plugin(toJSON);
artistSchema.plugin(paginate);

const Artist = User.discriminator('Artist', artistSchema);

module.exports = Artist;
