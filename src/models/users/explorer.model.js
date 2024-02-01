const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');
const User = require('../user.model'); // Base user model

const explorerSchema = mongoose.Schema(
    {
        bio: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
        discriminatorKey: 'explorer',
    },
);

explorerSchema.plugin(toJSON);
explorerSchema.plugin(paginate);

const Explorer = User.discriminator('Explorer', explorerSchema);

module.exports = Explorer;
