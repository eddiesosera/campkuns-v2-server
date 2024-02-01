const express = require('express');
const authRoute = require('./auth.route');
const artistRoute = require('./users/artist.route');
const adminRoute = require('./users/admin.route');
const galleryRoute = require('./users/gallery.route');
const explorerRoute = require('./users/explorer.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users/artists',
    route: artistRoute,
  },
  {
    path: '/users/admins',
    route: adminRoute,
  },
  {
    path: '/users/galleries',
    route: galleryRoute,
  },
  {
    path: '/users/explorers',
    route: galleryRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
