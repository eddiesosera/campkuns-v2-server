const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');
const User = require('../user.model'); // Import the base user model

const adminSchema = mongoose.Schema(
    {
        bio: {
            type: String,
            trim: true,
        },
        isSuperAdmin: {
            type: boolean,
            default: false
        }
    },
    {
        timestamps: true,
        discriminatorKey: 'admin'
    },
);

adminSchema.plugin(toJSON);
adminSchema.plugin(paginate);

const Admin = User.discriminator('Admin', adminSchema);

module.exports = Admin;
