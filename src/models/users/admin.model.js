const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');
const User = require('../user.model'); // Base user model

const adminSchema = mongoose.Schema(
    {
        isSuperAdmin: {
            type: Boolean,
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
