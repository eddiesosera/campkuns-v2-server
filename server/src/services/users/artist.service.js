const { Artist } = require('../../models');
const userService = require('../user.service');

const userType = 'Artist'

const createArtist = async (artistBody) => {
    // Additional logic...

    return userService.createUser(Artist, artistBody);
};

const queryArtists = async (filter, options) => {
    // Additional logic...

    return userService.queryUsers(Artist, filter, options);
};

const getArtistById = async (id) => {
    // Additional logic specific...

    return userService.getUserById(Artist, id);
};

const getArtistByEmail = async (email) => {
    return userService.getUserByEmail(email);
}

const updateArtistById = async (artistId, updateBody) => {
    return userService.updateUserById(artistId, updateBody, userType)
}

const deleteArtistById = async (userId) => {
    return userService.deleteUserById(userId, userType)
}

module.exports = {
    createArtist,
    queryArtists,
    getArtistById,
    getArtistByEmail,
    updateArtistById,
    deleteArtistById,
};
