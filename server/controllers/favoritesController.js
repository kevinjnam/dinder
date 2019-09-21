const Pool = require('pg').Pool;
const pool = new Pool({
  connectionString: 'url'
});

const getFavorites = (req, res, next) => {
  pool.query('SELECT * FROM favorites ORDER BY id'),
    (error, favorites) => {
      if (error) {
        res.json(error);
      } else {
        res.locals.favorites = favorites.rows;
        return next();
      }
    };
};

const addFavorite = (req, res, next) => {
  pool.query('INSERT INTO favorites (url) VALUES $1', [url], error => {
    if (error) {
      res.json(error);
    } else {
      return next();
    }
  });
};

module.exports = {
  getFavorites,
  addFavorite
};
