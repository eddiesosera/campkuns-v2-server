const userController = require('../user.controller'); // Base User controller
const galleryService = require('../../services/users/gallery.service');
const catchAsync = require('../../utils/catchAsync');

const createGallery = catchAsync(async (req, res) => {
    await userController.createUser(req, res, galleryService.createGallery);
});

const getGalleries = catchAsync(async (req, res) => {
    await userController.getUsers(req, res, galleryService.queryGalleries);
});

const getGallery = catchAsync(async (req, res, next) => {
    await userController.getUser(req, res, galleryService.getGalleryById, 'galleryId', 'Gallery');
});

const updateGallery = catchAsync(async (req, res) => {
    await userController.updateUser(req, res, galleryService.updateGalleryById, 'galleryId');
});

const deleteGallery = catchAsync(async (req, res) => {
    await userController.deleteUser(req, res, galleryService.deleteGalleryById, 'galleryId');
});

module.exports = {
    createGallery,
    getGalleries,
    getGallery,
    updateGallery,
    deleteGallery,
};
