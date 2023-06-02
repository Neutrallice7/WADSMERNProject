const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

// Set CORS headers to allow cross-origin requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

// Register routes for places and users
app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

// Handle unsupported routes
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

// Handle errors
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

// Connect to the MongoDB database using the provided connection string
mongoose
  .connect('mongodb+srv://gloobe3:Daffasyaidina89@custard.le00nl1.mongodb.net/mern')
  .then(() => {
    app.listen(5000); // Start the server once the database connection is ready
  })
  .catch(err => {
    console.log(err);
  });
