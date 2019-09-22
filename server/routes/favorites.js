const express = require('express');

const favoritesControllers = require('../controllers/favoritesController');

const router = express.Router();

// get favorites
router.get('/', favoritesControllers.getFavorites, (req, res) => {
  res.status(200).send(res.locals.favorites);
});

// add favorites
router.post('/', favoritesControllers.addFavorite, (req, res) => {
  res.status(200).end();
});

module.exports = router;
