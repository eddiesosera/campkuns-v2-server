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

const queryMediums = async () => {
    try {
        const media = await Media.find();
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

const getMediaByFormat = async (format) => {
    try {
        const mediaList = await Media.find({ format: format });
        return mediaList;
    } catch (error) {
        throw error;
    }
};

const deleteMediaById = async (mediaId) => {
    try {
        const result = await Media.findByIdAndDelete(mediaId);
        return result;
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
