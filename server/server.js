const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const favoritesControllers = require('./controllers/favoritesController');
const PORT = 3000;

app.use(bodyParser.json());

app.use('/build', express.static(path.join(__dirname, '../build')));
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});
app.get('/favorites', favoritesControllers.getFavorites, (req, res) => {
  res.status(200).send(res.locals.favorites);
});
app.post('/', favoritesControllers.addFavorite, (req, res) => {
  res.status(200).end();
});
app.use('*', (req, res) => {
  res.status(404).send('Route not found');
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// https://prod.liveshare.vsengsaas.visualstudio.com/join?5D95C55C85EB5B404C69DC88DD2B48CC25B3
