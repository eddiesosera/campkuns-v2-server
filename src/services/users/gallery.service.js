const { Gallery } = require('../../models');
const userService = require('../user.service');

const userType = 'Gallery'

const createGallery = async (galleryBody) => {
    return userService.createUser(Gallery, galleryBody);
};

const queryGalleries = async (filter, options) => {
    return userService.queryUsers(Gallery, filter, options);
};

const getGalleryById = async (galleryId) => {
    return userService.getUserById(Gallery, galleryId, userType);
};

const getGalleryByEmail = async (email) => {
    return userService.getUserByEmail(email);
}

const getGalleryByUsername = async (username) => {
    return userService.getUserByUsername(username);
}

// model,getUserFunction,userId, updateBody, userType
const updateGalleryById = async (artistId, updateBody) => {
    return userService.updateUserById(Gallery, getGalleryById, artistId, updateBody, userType)
}

const deleteGalleryById = async (userId) => {
    return userService.deleteUserById(getGalleryById, userId, userType)
}

module.exports = {
    createGallery,
    queryGalleries,
    getGalleryById,
    getGalleryByEmail,
    getGalleryByUsername,
    updateGalleryById,
    deleteGalleryById,
};
