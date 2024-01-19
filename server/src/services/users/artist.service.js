const { Artist } = require('../../models');
const userService = require('../user.service');

const userType = 'Artist'

const createArtist = async (artistBody) => {
    return userService.createUser(Artist, artistBody);
};

const queryArtists = async (filter, options) => {
    return userService.queryUsers(Artist, filter, options);
};

const getArtistById = async (id) => {
    return userService.getUserById(Artist, id);
};

const getArtistByEmail = async (email) => {
    return userService.getUserByEmail(email);
}

// model,getUserFunction,userId, updateBody, userType
const updateArtistById = async (artistId, updateBody) => {
    return userService.updateUserById(Artist, getArtistById, artistId, updateBody, userType)
}

const deleteArtistById = async (userId) => {
    return userService.deleteUserById(getArtistById, userId, userType)
}

module.exports = {
    createArtist,
    queryArtists,
    getArtistById,
    getArtistByEmail,
    updateArtistById,
    deleteArtistById,
};
