const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const mediaSchema = mongoose.Schema(
    {
        data: {
            type: Buffer,
            contentType: String,
            default: '',
            required: true
        },
        parentId: {
            type: String,
            default: '',
            required: true
        },
        fileName: {
            type: String,
            default: ''
        },
        // contentType: {
        //     type: String,
        //     default: '',
        //     enum: ["banner", "artwork", "review"],
        //     // required: true
        // },
        // format: {
        //     type: String,
        //     default: '',
        //     enum: ["image/png", "image/jpeg", "image/png", "image/gif",
        //         "image/webp", "image/mp4", "image/avi", "image/webm", "image/3gp", "image/ogg", "image/mov"],
        //     required: true
        // },
        // dimensions: {
        //     pixels: {
        //         type: String,
        //         default: ''
        //     },
        //     aspectRatio: {
        //         type: String,
        //         default: '',
        //         enum: ["1:1", "2:1", "4:3", "14:9", "16:10", "21:9"]
        //     },
        // },
        uploadedOn: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true,
    },
);

// converts mongoose to json
mediaSchema.plugin(toJSON);
mediaSchema.plugin(paginate);

/**
 * @typedef Media
 */
const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;
