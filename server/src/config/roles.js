const allRoles = {
  artist: ['getArtists', 'manageUsers'],
  gallery: [],
  organizer: [],
  tourist: [],
  admin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
