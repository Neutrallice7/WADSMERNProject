const uuid = require('uuid/v4'); 
const { validationResult } = require('express-validator'); 

const HttpError = require('../models/http-error'); 
const getCoordsForAddress = require('../util/location'); 

let DUMMY_PLACES = [ // Array of dummy places
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous skyscrapers in the world!',
    location: {
      lat: 40.7484474,
      lng: -73.9871516
    },
    address: '20 W 34th St, New York, NY 10001',
    creator: 'u1'
  }
];

// Middleware function to get a place by its ID
const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid; // Extracting the place ID from the request parameters

  const place = DUMMY_PLACES.find(p => p.id === placeId); // Finding the place in the DUMMY_PLACES array with the provided ID

  if (!place) {
    throw new HttpError('Could not find a place for the provided id.', 404); // Throwing an HTTP error if the place is not found
  }

  res.json({ place }); // Sending the found place as the response
};

// Middleware function to get places by user ID
const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid; // Extracting the user ID from the request parameters

  const places = DUMMY_PLACES.filter(p => p.creator === userId); // Filtering the DUMMY_PLACES array to get places created by the specified user ID

  if (!places || places.length === 0) {
    return next(
      new HttpError('Could not find places for the provided user id.', 404) // Forwarding an HTTP error if no places are found for the user ID
    );
  }

  res.json({ places }); // Sending the found places as the response
};

// Middleware function to create a new place
const createPlace = async (req, res, next) => {
  const errors = validationResult(req); // Validating the request using express-validator
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422) // Forwarding an HTTP error if validation errors are present
    );
  }

  const { title, description, address, creator } = req.body; // Extracting the necessary details from the request body

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address); // Getting coordinates for the provided address using the getCoordsForAddress function
  } catch (error) {
    return next(error); // Forwarding any errors occurred during coordinate retrieval
  }

  const createdPlace = {
    id: uuid(), // Generating a unique ID using UUID
    title,
    description,
    location: coordinates,
    address,
    creator
  };

  DUMMY_PLACES.push(createdPlace); // Adding the newly created place to the DUMMY_PLACES array

  res.status(201).json({ place: createdPlace }); // Sending the created place as the response
};

// Middleware function to update a place
const updatePlace = (req, res, next) => {
  const errors = validationResult(req); // Validating the request using express-validator
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422); // Throwing an HTTP error if validation errors are present
  }

  const { title, description } = req.body; // Extracting the updated details from the request body
  const placeId = req.params.pid; // Extracting the place ID from the request parameters

  const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) }; // Finding the place in the DUMMY_PLACES array with the provided ID and creating a copy
  const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId); // Finding the index of the place in the DUMMY_PLACES array

  updatedPlace.title = title; // Updating the title
  updatedPlace.description = description; // Updating the description

  DUMMY_PLACES[placeIndex] = updatedPlace; // Updating the place in the DUMMY_PLACES array

  res.status(200).json({ place: updatedPlace }); // Sending the updated place as the response
};

// Middleware function to delete a place
const deletePlace = (req, res, next) => {
  const placeId = req.params.pid; // Extracting the place ID from the request parameters

  if (!DUMMY_PLACES.find(p => p.id === placeId)) {
    throw new HttpError('Could not find a place for that id.', 404); // Throwing an HTTP error if the place is not found
  }

  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId); // Filtering out the place to be deleted from the DUMMY_PLACES array

  res.status(200).json({ message: 'Deleted place.' }); // Sending a success message as the response
};

// Exporting the middleware functions
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
