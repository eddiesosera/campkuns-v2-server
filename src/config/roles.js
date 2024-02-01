const allRoles = {
  artist: ['artists', 'getArtists', 'manageArtists'],
  gallery: ['galleries', 'getGalleries', 'manageGalleries'],
  organizer: [],
  tourist: [],
  admin: [
    'admins',
    'getAdmins',
    'manageAdmins',
    'artists',
    'getArtists',
    'manageArtists',
    'galleries',
    'getGalleries',
    'manageGalleries',
    'getUsers',
    'manageUsers',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
