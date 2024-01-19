const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');

// const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
//   if (err || info || !user) {
//     return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
//   }
//   req.user = user;

//   if (requiredRights.length) {
//     const userRights = roleRights.get(user.role);
//     const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
//     if (!hasRequiredRights && req.params.userId !== user.id ||
//       !hasRequiredRights && req.params.artistId !== user.id) {
//       return reject(new ApiError(httpStatus.FORBIDDEN, `${user.role} ${user.id} is Forbidden ID: ${req.params.artistId}`));
//     }
//   }

//   resolve();
// };

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }

  req.user = user;

  if (requiredRights.length) {
    const userRights = roleRights.get(user.role);
    const userTypes = req.params.userIdn || req.params.artistId

    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));

    // Check if the action is related to updating or deleting user accounts
    const isUpdatingUser = req.method === 'PATCH' && req.baseUrl.includes('/users/artists');
    const isDeletingUser = req.method === 'DELETE' && req.baseUrl.includes('/users/artists');

    // Allow the update or delete action only if it's the user's own account or if the user is an admin
    if ((isUpdatingUser || isDeletingUser) && userTypes !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden: You can only modify your own account'));
    }

    // General check for other rights
    if (!hasRequiredRights) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
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
