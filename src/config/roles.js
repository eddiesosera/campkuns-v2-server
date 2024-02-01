const allRoles = {
  artist: ['artists', 'getArtists', 'manageArtists'],
  gallery: ['galleries', 'getGalleries', 'manageGalleries'],
  organizer: [],
  explorer: ['explorer', 'getExplorers', 'manageExplorers'],
  admin: [
    // Admins
    'admins',
    'getAdmins',
    'manageAdmins',
    // Artists:
    'artists',
    'getArtists',
    'manageArtists',
    // Galleries
    'galleries',
    'getGalleries',
    'manageGalleries',
    // Base User
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
