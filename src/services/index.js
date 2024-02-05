// USERS
module.exports.userService = require('./user.service');
module.exports.adminService = require('./users/admin.service');
module.exports.galleryService = require('./users/gallery.service');
module.exports.artistService = require('./users/artist.service');

// AUTH
module.exports.authService = require('./auth.service');
module.exports.emailService = require('./email.service');
module.exports.tokenService = require('./token.service');

// MEDIA
module.exports.mediaService = require('./media.service')
