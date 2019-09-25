const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const favorites = require('./routes/favorites');
const PORT = 3000;
const login = require('./routes/login.js');
// const cors = require('cors');
// const fetch = require('node-fetch')
//GET https://api.yelp.com/v3/businesses/search
// app.use('/yelpLogin', cors(), () => {
//   fetch('https://api.yelp.com/v3/authentication', {
//     headers: {
//       // 'Content-Type': 'application/json',
//       'Authorization': 'Bearer' + 'MxW3xR7Rer69HBj6a9X8rHTC475CWQbIkykfByj6GMgQ-yQHplZfERxvXoClZomtIZsRkgXwDGeCq99FYeMTyeDM3ZQ1fBX-gNw15z1hr3Oc5xGdNs0XkuaofrmKXXYx',
//       // 'Access-Control-Allow-Origin': '*'
//     }
//   })
//   .then(res => res.json())
//   .then(data => console.log(data))
// });

app.use(bodyParser.json());

app.use('/assets', express.static(path.join(__dirname, '../client/assets')));

app.use('/build', express.static(path.join(__dirname, '../build')));

// route to home page
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.use('/signup', login)
//route to login
app.use('/login', login);
// route to favorites
app.use('/favorites', favorites);

app.use('*', (req, res) => {
  res.status(404).send('Route not found');
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
