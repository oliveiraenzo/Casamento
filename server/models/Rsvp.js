const mongoose = require('mongoose');

const RsvpSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  confirmation: { type: String, required: true },
  guests: { type: Number },
  restrictions: { type: String },
  message: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Rsvp', RsvpSchema);