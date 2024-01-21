const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, tokenService, emailService, artistService } = require('../services');

const register = catchAsync(async (req, res) => {
  const role = req.body.role;
  let userService;

  // Determine the service based on the user's role
  switch (role) {
    case 'artist':
      userService = artistService;
      break;
    // case 'gallery':
    //   userService = galleryService;
    //   break;
    // case 'organizer':
    //   userService = organizerService;
    //   break;
    // case 'tourist':
    //   userService = touristService;
    //   break;
    default:
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user role');
  }
  const user = await artistService.createArtist(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, username, password } = req.body;

  if ((!email && !username) || !password) {
    return res.status(400).json({ message: 'Email or username and password are required' });
  }

  let user;

  if (email) {
    user = await authService.loginUserWithEmailAndPassword(email, password);
  } else if (username) {
    user = await authService.loginUserWithUsernameAndPassword(username, password);
  }

  if (!user) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }

  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
