const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

// Handler for fetching all users
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password'); // Excluding the 'password' field from the returned users
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ users: users.map(user => user.toObject({ getters: true })) }); // Converting users to plain objects
};

// Handler for user signup
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Md-CewELZVMuzGVtm4lJKagHG8YlA0c1w9VstwCpjZr38qdhbdESgLt-8maVPlMCSEE&usqp=CAU',
    password,
    places: []
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) }); // Converting the created user to a plain object
};

// Handler for user login
const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }

  res.json({ message: 'Logged in!' }); // return a success message in the response
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
