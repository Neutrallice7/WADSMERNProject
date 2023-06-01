const uuid = require('uuid/v4'); 
const { validationResult } = require('express-validator'); 
const HttpError = require('../models/http-error'); 

// Dummy users array
const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'John Doe',
    email: 'johnD@test.com',
    password: 'example'
  }
];

// Handler for retrieving users
const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

// Handler for user signup
const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find(u => u.email === email);
  if (hasUser) {
    throw new HttpError('Could not create user, email already exists.', 422);
  }

  const createdUser = {
    id: uuid(), // Generate a unique user ID using the uuid() function
    name, // Equivalent to name: name
    email,
    password
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser }); // Return the created user in the response
};

// Handler for user login
const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(u => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError('Could not identify user, credentials seem to be wrong.', 401);
  }

  res.json({ message: 'Logged in!' }); // Return a success message in the response
};

// Export the defined functions to make them accessible in other files
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;