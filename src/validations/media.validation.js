const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createMedia = {
    body: Joi.object().keys({
        parentId: Joi.string().custom(objectId),
        fileName: Joi.string().required(),
        format: Joi.string().required("image/png", "image/jpeg", "image/png", "image/gif",
            "image/webp", "image/mp4", "image/avi", "image/webm", "image/3gp", "image/ogg", "image/mov"),
        contentType: Joi.string().required().valid('banner', 'artwork', 'review'),
        dimensions: Joi.object().keys({
            pixels: Joi.string(),
            aspectRatio: Joi.string().required().valid("1:1", "2:1", "4:3", "14:9", "16:10", "21:9")
        }),
    }),
};

const queryMediums = {
    query: Joi.object().keys({
        fileName: Joi.string(),
        role: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getMedium = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    }).required(),
};

const getMediumByFormat = {
    params: Joi.object().keys({
        format: Joi.string().valid('image/png'),
    }).required(),
};

const updateMedium = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    }).required(),
    body: Joi.object()
        .keys({
            parentId: Joi.string().custom(objectId),
            fileName: Joi.string().required(),
            format: Joi.string().required("image/png", "image/jpeg", "image/png", "image/gif",
                "image/webp", "image/mp4", "image/avi", "image/webm", "image/3gp", "image/ogg", "image/mov"),
            contentType: Joi.string().required().valid('banner', 'artwork', 'review'),
            dimensions: Joi.object().keys({
                pixels: Joi.string(),
                aspectRatio: Joi.string().required().valid("1:1", "2:1", "4:3", "14:9", "16:10", "21:9")
            }),
        })
        .min(1),
};

const deleteMedium = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    }).required(),
};

module.exports = {
    createMedia,
    queryMediums,
    getMedium,
    getMediumByFormat,
    updateMedium,
    deleteMedium,
};
