const userController = require('../user.controller'); // Base User controller
const explorerService = require('../../services/users/explorer.service');
const catchAsync = require('../../utils/catchAsync');

const createExplorer = catchAsync(async (req, res) => {
    await userController.createUser(req, res, explorerService.createExplorer);
});

const getExplorers = catchAsync(async (req, res) => {
    await userController.getUsers(req, res, explorerService.queryExplorers);
});

const getExplorer = catchAsync(async (req, res, next) => {
    await userController.getUser(req, res, explorerService.getExplorerById, 'explorerId', 'Explorer');
});

const updateExplorer = catchAsync(async (req, res) => {
    await userController.updateUser(req, res, explorerService.updateExplorerById, 'explorerId');
});

const deleteExplorer = catchAsync(async (req, res) => {
    await userController.deleteUser(req, res, explorerService.deleteExplorerById, 'explorerId');
});

module.exports = {
    createExplorer,
    getExplorers,
    getExplorer,
    updateExplorer,
    deleteExplorer,
};
