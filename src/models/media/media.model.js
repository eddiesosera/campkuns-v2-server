const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');
const { types } = require('joi');

let hex = /^#([0-9a-fA-F]{6})$/;
let hsla = /^hsla\((\d+),\s*(\d+%)\s*,\s*(\d+%)\s*,\s*([01](?:\.\d+)?)\)$/;
let hsba = /^hsba\((\d+),\s*(\d+%)\s*,\s*(\d+%)\s*,\s*([01](?:\.\d+)?)\)$/;
let rgba = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([01](?:\.\d+)?)\)$/;

const colorFormatValidation = (value) => {
    if (
        !value.match(hex) || // Hex: #ffffff
        !value.match(hsla) || // HSLA: hsla(0, 0%, 7%, 1)
        !value.match(hsba) || //HDBA: hsba(0, 0%, 7%, 1)
        !value.match(rgba) //RGBA: rgba(18, 18, 18, 1)
    ) {
        throw new Error('Color must be in a valid format');
    }
}

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
        format: {
            type: String,
            default: '',
            enum: ["image-png", "image/jpeg", "image/png", "image/gif",
                "image/webp", "image/mp4", "image/avi", "image/webm", "image/3gp", "image/ogg", "image/mov"],
            required: true
        },
        contentType: {
            type: String,
            default: '',
            enum: ["banner", "artwork", "review"],
            required: true
        },
        dimensions: {
            pixels: {
                type: String,
                default: ''
            },
            aspectRatio: {
                type: String,
                default: '',
                enum: ["1:1", "2:1", "4:3", "14:9", "16:10", "21:9"]
            },
        },
        colorScheme: {
            accent: {
                type: String,
                validate(value) {
                    colorFormatValidation(value)
                }
            }
        },
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
