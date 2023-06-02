const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }]
});

// Apply the uniqueValidator plugin to the user schema
userSchema.plugin(uniqueValidator);

// Export the User model using the user schema
module.exports = mongoose.model('User', userSchema);
