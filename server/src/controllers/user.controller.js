const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const createUser = catchAsync(async (req, res, service, action) => {
  const user = await userService.createUser(req.body); //action: createUser
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res, service, filters, action) => {
  const filter = pick(req.query, filters); //default:['name', 'role']
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await service[action](filter, options); //action: queryUsers
  res.send(result);
  console.log('Controller req' + req)
});

const getUser = catchAsync(async (req, res, service, type, action) => {
  const user = await service[action](req.params.userId); //action: getUserById
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, `${type} not found`);
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res, service, action) => {
  const user = await service[action](req.params.userId, req.body); // //action: updateUserById
  res.send(user);
});

const deleteUser = catchAsync(async (req, res, service, action) => {
  await service[action](req.params.userId);//action: deleteUserById
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
