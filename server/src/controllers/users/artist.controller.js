const httpStatus = require('http-status');
const userController = require('../user.controller'); // Import the base controller
const artistService = require('../../services/users/artist.service'); // Import the artist service
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');

const createArtist = catchAsync(async (req, res) => {
    await userController.createUser(req, res, artistService.createArtist); // 'createArtist' is the specific action for the artist service
});

const getArtists = catchAsync(async (req, res) => {
    await userController.getUsers(req, res, artistService.queryArtists); // 'queryArtists' is the specific action for the artist service
});

const getArtist = catchAsync(async (req, res, next) => {
    await userController.getUser(req, res, artistService.getArtistById, 'artistId');
});

const updateArtist = catchAsync(async (req, res) => {
    await userController.updateUser(req, res, artistService.updateArtistById, 'artistId'); // 'updateArtist' is the specific action for the artist service
});

const deleteArtist = catchAsync(async (req, res) => {
    await userController.deleteUser(req, res, artistService.deleteArtistById, 'artistId'); // 'deleteArtist' is the specific action for the artist service
});

module.exports = {
    createArtist,
    getArtists,
    getArtist,
    updateArtist,
    deleteArtist,
};
