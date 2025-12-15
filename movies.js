const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Create a movie
router.post('/', async (req, res) => {
  try {
    const { title, genre, year, posterUrl } = req.body;
    const movie = new Movie({ title, genre, year, posterUrl });
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create movie' });
  }
});

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// Update a movie
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, genre, year, posterUrl } = req.body;
    const movie = await Movie.findByIdAndUpdate(
      id,
      { title, genre, year, posterUrl },
      { new: true }
    );
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update movie' });
  }
});

// Delete a movie
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete movie' });
  }
});

module.exports = router;
