const allRoles = {
  artist: ['artists', 'getArtists', 'manageArtists'],
  gallery: [],
  organizer: [],
  tourist: [],
  admin: [
    'admins',
    'getAdmins',
    'manageAdmins',
    'artists',
    'getArtists',
    'manageArtists',
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
