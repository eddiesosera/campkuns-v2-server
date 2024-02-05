const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { ref } = require('joi');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: function () {
        return this.username || 'User';
      }
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      default: 'explorer',
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    banner: {
      type: String,
      default: '',
    },
    dateJoined: {
      type: Date,
      default: Date.now,
      immutable: true
    },
    following: [
      { type: String, default: '' }
    ],
    followers: [
      { type: String, default: '' }
    ],
    contactDetails: [{
      name: {
        type: String,
        default: ''
      },
      link: {
        type: String,
        default: ''
      },
    }],
    categories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Genres',
      default: ''
    }],
    genres: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categories',
      default: ''
    }],
    accountCreatedBy: {
      type: {
        type: String,
        default: 'self',
        enum: ['admin', 'self']
      },
      creatorId: {
        type: String,
        default: ''
      },
    }
  },
  {
    timestamps: true,
  },
);

// Virtual property for yearsActive
userSchema.virtual('yearsActive').get(function () {
  if (this.dateJoined) {
    const currentDate = new Date();
    const yearsActive = currentDate.getFullYear() - this.dateJoined.getFullYear();

    return yearsActive;
  }
  return 0;
});
userSchema.set('toJSON', { virtuals: true });

// converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if username is taken
 * @param {string} username - The user's unique name
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isUsernameTaken = async function (username, excludeUserId) {
  const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
