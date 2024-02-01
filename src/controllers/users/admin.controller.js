const userController = require('../user.controller'); // Base User controller
const adminService = require('../../services/users/admin.service');
const catchAsync = require('../../utils/catchAsync');

const createAdmin = catchAsync(async (req, res) => {
    await userController.createUser(req, res, adminService.createAdmin);
});

const getAdmins = catchAsync(async (req, res) => {
    await userController.getUsers(req, res, adminService.queryAdmins);
});

const getAdmin = catchAsync(async (req, res, next) => {
    await userController.getUser(req, res, adminService.getAdminById, 'adminId', 'Admin');
});

const updateAdmin = catchAsync(async (req, res) => {
    await userController.updateUser(req, res, adminService.updateAdminById, 'adminId');
});

const deleteAdmin = catchAsync(async (req, res) => {
    await userController.deleteUser(req, res, adminService.deleteAdminById, 'adminId');
});

module.exports = {
    createAdmin,
    getAdmins,
    getAdmin,
    updateAdmin,
    deleteAdmin,
};
