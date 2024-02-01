const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }

  req.user = user;
  let requestPath;

  requestPath === "gallery" ? requestPath = "galleries" : requestPath = user.role;

  // switch (requestPath) {
  //   case 'artist':
  //     requestRole = 'artist';
  //     break;
  //   case 'admin':
  //     requestRole = 'admin';
  //     break;
  //   case 'gallery':
  //     requestRole = 'galleries';
  //     break;
  // }

  if (requiredRights.length) {
    const userRights = roleRights.get(user.role);
    const userTypes = req.params[user.role]

    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));

    // Check if the action is related to updating or deleting user accounts
    const isUpdatingUser =
      req.method === 'PATCH' && req.baseUrl.includes(`/users/${requestPath}`);
    const isDeletingUser = req.method === 'DELETE' && req.baseUrl.includes(`/users/${requestPath}`);

    // Allow the update or delete action only if it's the user's own account or if the user is an admin
    if (user.role !== "admin") {
      if ((isUpdatingUser || isDeletingUser) && userTypes !== user.id) {
        return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden: You can only modify your own account'));
      }
    }

    // General check for other rights
    if (!hasRequiredRights) {
      return reject(new ApiError(httpStatus.FORBIDDEN, `Forbidden Access Id: ${userTypes}. Rights for access: [${userRights}] and, Rights possesed: [${requiredRights}]`));
    }
  }

  resolve();
};


const auth = (...requiredRights) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;
