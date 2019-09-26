const pool = require ('../database.js');

// get favorites
const getFavorites = (req, res, next) => {
  const arr = [req.body.user];
  pool.query(
    `SELECT * FROM favorites WHERE "user" = $1 ORDER BY _id`,
    arr,
    (err, favorites) => {
      if (err) return next(err);
      res.locals.favorites = favorites.rows;
      return next();
    }
  );
};

// add favorite
const addFavorite = (req, res, next) => {
  const {
    name,
    address,
    imgurl,
    yelpid,
    yelpurl,
    rating,
    phone
  } = req.body.business;
  const user = req.body.user;

  pool.query(
    `INSERT INTO favorites ("name", "address", "imgurl", "yelpid", "yelpurl", "rating", "phone", "user") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [name, address, imgurl, yelpid, yelpurl, rating, phone, user],
    (err, result) => {
      if (err) return next(err);
      else {
        return next();
      }
    }
  );
};

// delete favorite
const deleteFavorite = (req, res, next) => {
  const { currentUser, yelpid } = req.body;
  pool.query(
    `DELETE FROM favorites WHERE "user" = $1 AND "yelpid" = $2`,
    [currentUser, yelpid],
    (err, result) => {
      if (err) return next(err);
      else {
        return next();
      }
    }
  );
};

module.exports = {
  getFavorites,
  addFavorite,
  deleteFavorite
};
