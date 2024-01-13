const httpStatus = require('http-status');
const userController = require('../user.controller'); // Import the base controller
const artistService = require('../../services/users/artist.service'); // Import the artist service

const createArtist = async (req, res) => {
    await userController.createUser(req, res, artistService, 'createArtist'); // 'createArtist' is the specific action for the artist service
};

const getArtists = async (req, res) => {
    await userController.getUsers(req, res, artistService, ['name', 'role'], 'queryArtists'); // 'queryArtists' is the specific action for the artist service
};

const getArtist = async (req, res) => {
    await userController.getUser(req, res, artistService, 'Artist', 'getArtistById'); // 'getArtistById' is the specific action for the artist service
};

const updateArtist = async (req, res) => {
    await userController.updateUser(req, res, artistService, 'updateArtist'); // 'updateArtist' is the specific action for the artist service
};

const deleteArtist = async (req, res) => {
    await userController.deleteUser(req, res, artistService, 'deleteArtist'); // 'deleteArtist' is the specific action for the artist service
};

module.exports = {
    createArtist,
    getArtists,
    getArtist,
    updateArtist,
    deleteArtist,
};
