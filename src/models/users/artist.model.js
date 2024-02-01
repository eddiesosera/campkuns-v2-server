const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');
const User = require('../user.model'); // Base user model

const artistSchema = mongoose.Schema(
    {
        bio: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
        discriminatorKey: 'artist',
    },
);

artistSchema.plugin(toJSON);
artistSchema.plugin(paginate);

const Artist = User.discriminator('Artist', artistSchema);

module.exports = Artist;
