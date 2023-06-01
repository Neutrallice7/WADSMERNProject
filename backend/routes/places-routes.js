const express = require('express');
const { check } = require('express-validator');

const placesControllers = require('../controllers/places-controllers');

const router = express.Router();

// GET request to retrieve a place by ID
router.get('/:pid', placesControllers.getPlaceById);

// GET request to retrieve places by user ID
router.get('/user/:uid', placesControllers.getPlacesByUserId);

// POST request to create a new place
router.post(
  '/',
  [
    // Validation middleware using express-validator
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').not().isEmpty()
  ],
  placesControllers.createPlace
);

// PATCH request to update a place
router.patch(
  '/:pid',
  [
    // Validation middleware using express-validator
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  placesControllers.updatePlace
);

// DELETE request to delete a place
router.delete('/:pid', placesControllers.deletePlace);

module.exports = router;
