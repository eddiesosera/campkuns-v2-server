const { Admin } = require('../../models');
const userService = require('../user.service');

const userType = 'Admin'

const createAdmin = async (adminBody) => {
    return userService.createUser(Admin, adminBody);
};

const queryAdmins = async (filter, options) => {
    return userService.queryUsers(Admin, filter, options);
};

const getAdminById = async (adminId) => {
    adminId
    return userService.getUserById(Admin, adminId, userType);
};

const getAdminByEmail = async (email) => {
    return userService.getUserByEmail(email);
}

const getAdminByUsername = async (username) => {
    return userService.getUserByUsername(username);
}

// model,getUserFunction,userId, updateBody, userType
const updateAdminById = async (adminId, updateBody) => {
    return userService.updateUserById(Admin, getAdminById, adminId, updateBody, userType)
}

const deleteAdminById = async (userId) => {
    return userService.deleteUserById(getAdminById, userId, userType)
}

module.exports = {
    createAdmin,
    queryAdmins,
    getAdminById,
    getAdminByEmail,
    getAdminByUsername,
    updateAdminById,
    deleteAdminById,
};
