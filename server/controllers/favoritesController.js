const Pool = require('pg').Pool;
const pool = new Pool({
  connectionString:
    'postgres://kpbrjtvt:tmU2ixXRIwrYp1_uBqvugQbY18KfYQwi@otto.db.elephantsql.com:5432/kpbrjtvt'
});

// get favorites
const getFavorites = (req, res, next) => {
  pool.query('SELECT * FROM favorites ORDER BY _id', (error, favorites) => {
    if (error) {
      res.json(error);
    }
    res.locals.favorites = favorites.rows;
    return next();
  });
};

// add favorite
const addFavorite = (req, res, next) => {
  const { name, address, imageURL, id, yelpURL } = req.body;

  pool.query(
    'INSERT INTO favorites (name, address, imgurl, yelpid, yelpurl) VALUES ($1, $2, $3, $4, $5)',
    [name, address, imageURL, id, yelpURL],
    error => {
      if (error) {
        res.json(error);
      } else {
        return next();
      }
    }
  );
};

module.exports = {
  getFavorites,
  addFavorite
};
