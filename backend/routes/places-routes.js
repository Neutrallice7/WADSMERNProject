const express = require('express');
const { check } = require('express-validator');

const placesControllers = require('../controllers/places-controllers');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

// Get place by ID
router.get('/:pid', placesControllers.getPlaceById);

// Get places by user ID
router.get('/user/:uid', placesControllers.getPlacesByUserId);

// Create a new place
router.post(
  '/',
  fileUpload.single('image'),
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address')
      .not()
      .isEmpty()
  ],
  placesControllers.createPlace
);

// Update a place
router.patch(
  '/:pid',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  placesControllers.updatePlace
);

// Delete a place
router.delete('/:pid', placesControllers.deletePlace);

module.exports = router;
