const allRoles = {
  artist: ['artists', 'getArtists'],
  gallery: ['galleries', 'getGalleries'],
  organizer: [],
  explorer: ['explorer', 'getExplorers'],
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
    // Explorers
    'explorer',
    'getExplorers',
    'manageExplorers',
    // Base User
    'getUsers',
    'manageUsers',
    // Media
    'getMedia',
    'manageMedia'
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
