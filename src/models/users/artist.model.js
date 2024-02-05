const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');
const User = require('../user.model'); // Base user model

const artistSchema = mongoose.Schema(
    {
        artworks: {
            uploadType: {
                type: String,
                default: 'single',
                enum: ["single", "multiple"]
            },
            ids: [{
                type: String,
                default: ''
            }]
        },
        exhibitionFeatured: [{
            type: String,
            default: ''
        }],
        galleryAppearences: [{
            type: String,
            default: ''
        }],
        upcomingEvents: [{
            type: String, default: ''
        }],
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
