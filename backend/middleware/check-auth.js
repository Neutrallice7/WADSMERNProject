const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header
    if (!token) {
      throw new Error('Authentication failed!');
    }

    const decodedToken = jwt.verify(token, 'supersecret_dont_share'); // Verify and decode the token using the secret key
    req.userData = { userId: decodedToken.userId }; // Attach the user ID from the decoded token to the request object
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    const error = new HttpError('Authentication failed!', 403);
    return next(error); // Return an error response if authentication fails
  }
};
