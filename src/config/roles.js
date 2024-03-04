const allRoles = {
  artist: [
    // Self
    'artists',
    'getArtists',
    // Media
    'getMedia',
    'manageMedia'
  ],
  gallery: [
    // Self
    'galleries',
    'getGalleries',
    // Media
    'getMedia',
    'manageMedia'
  ],
  organizer: [

  ],
  explorer: [
    // Self
    'explorer',
    'getExplorers',
    // Media
    'getMedia',
    'manageMedia'
  ],
  admin: [
    // Self
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
