const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

// Serve static files from the "uploads/images" directory
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

// Set headers for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

// Routes
app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

// Error handling for invalid routes
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

// Error handling middleware
app.use((error, req, res, next) => {
  // Delete uploaded file if an error occurred
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

// Connect to MongoDB and start the server
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@custard.le00nl1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority/`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch(err => {
    console.log(err);
  });
