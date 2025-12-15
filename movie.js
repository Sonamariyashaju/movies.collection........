const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    genre: { type: String },
    year: { type: Number },
    posterUrl: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', MovieSchema);
