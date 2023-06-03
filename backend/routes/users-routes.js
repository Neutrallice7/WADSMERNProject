const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controllers');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

// Get all users
router.get('/', usersController.getUsers);

// User signup route
router.post(
  '/signup',
  fileUpload.single('image'), // Middleware for file upload
  [
    // Validation checks for name, email, and password fields
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],
  usersController.signup
);

// User login route
router.post('/login', usersController.login);

module.exports = router;
