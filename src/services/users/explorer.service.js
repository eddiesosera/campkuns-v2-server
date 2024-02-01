const { Explorer } = require('../../models');
const userService = require('../user.service');

const userType = 'Explorer'

const createExplorer = async (explorerBody) => {
    return userService.createUser(Explorer, explorerBody);
};

const queryExplorers = async (filter, options) => {
    return userService.queryUsers(Explorer, filter, options);
};

const getExplorerById = async (explorerId) => {
    adminId
    return userService.getUserById(Explorer, explorerId, userType);
};

const getExplorerByEmail = async (email) => {
    return userService.getUserByEmail(email);
}

const getExplorerByUsername = async (username) => {
    return userService.getUserByUsername(username);
}

// model,getUserFunction,userId, updateBody, userType
const updateExplorerById = async (explorerId, updateBody) => {
    return userService.updateUserById(Explorer, getExplorerById, explorerId, updateBody, userType)
}

const deleteExplorerById = async (explorerId) => {
    return userService.deleteUserById(getExplorerById, explorerId, userType)
}

module.exports = {
    createExplorer,
    queryExplorers,
    getExplorerById,
    getExplorerByEmail,
    getExplorerByUsername,
    updateExplorerById,
    deleteExplorerById,
};
