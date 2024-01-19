const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const createUser = async (req, res, serviceMethod) => {
  const user = await serviceMethod(req.body); //action: createUser
  res.status(httpStatus.CREATED).send(user);
};

const getUsers = async (req, res, serviceMethod) => {
  console.log('User Controller Get User: Start')
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await serviceMethod(filter, options); //action: queryUsers
  res.send(result);
  console.log('Controller req' + req)
};

const getUser = async (req, res, serviceMethod, idType) => {
  const user = await serviceMethod(req.params[idType]);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  res.send(user);
};


const updateUser = async (req, res, serviceMethod, idType) => {
  const user = await serviceMethod(req.params[idType], req.body); // //action: updateUserById
  res.send(user);
};

const deleteUser = async (req, res, serviceMethod, idType) => {
  await serviceMethod(req.params[idType]);//action: deleteUserById
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
