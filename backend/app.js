const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

// Routes for places and users
app.use('/api/places', placesRoutes); // => /api/places...
app.use('/api/users', usersRoutes);

// Middleware for handling unsupported routes
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose // Connect to the MongoDB database using the provided connection string
  .connect('mongodb+srv://gloobe3:Daffasyaidina89@custard.le00nl1.mongodb.net/places')
  .then(() => {
    app.listen(5000); // Start the server once the database connection is ready
  })
  .catch(err => {
    console.log(err);
  });