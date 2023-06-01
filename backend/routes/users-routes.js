const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controllers');

const router = express.Router();

// GET request to retrieve all users
router.get('/', usersController.getUsers);

// POST request for user signup
router.post(
  '/signup',
  [
    // Validation middleware using express-validator
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 })
  ],
  usersController.signup
);

// POST request for user login
router.post('/login', usersController.login);

module.exports = router;
