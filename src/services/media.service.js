const httpStatus = require('http-status');
const { Media } = require('../models');
const ApiError = require('../utils/ApiError');

const createMedia = async (mediaData) => {
    try {
        const media = new Media(mediaData);
        await media.save();
        return media;
    } catch (error) {
        throw error;
    }
};

const queryMediums = async (filter, options) => {
    try {
        const media = await Media.paginate(filter, options);
        return media;
    } catch (error) {
        return res.status(400).json({ error: 'No files uploaded as: ', error });
        throw error;

    }
};

const getMediaById = async (mediaId) => {
    try {
        const media = await Media.findById(mediaId);
        return media;
    } catch (error) {
        throw error;
    }
};

const getMediaByFormat = async (filter, options) => {
    try {
        const mediaList = await Media.paginate(filter, options);
        return mediaList;
    } catch (error) {
        throw error;
    }
};

const deleteMediaById = async (mediaId) => {
    try {
        const result = await Media.findByIdAndDelete(mediaId);
        return result + `Media ${mediaId} successfully removed`;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createMedia,
    queryMediums,
    getMediaById,
    getMediaByFormat,
    deleteMediaById,
};
