const pool = require ('../database.js');
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const verifyUser = (req, res, next) => {
  let queryforPass = `SELECT "password" FROM "Users" WHERE "user" = '${req.body.user}'`;
  pool.query(queryforPass, function (err, result) {
  if (err) return res.send('Not Verified');
    bcrypt.compare(req.body.pass, result.rows[0].password, (err, result) => {
      if (err) return next(err);
      if (result) return next();
      else return res.send('Not Verified');
    })
  })
}


const createUser = (req, res, next) => {
  if (!req.body.user || !req.body.pass) return res.render('/signup', {error: 'Please properly format the username and password'});
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(req.body.pass, salt, function (err, hash) {
      if (err) return next (err);
      req.body.pass = hash;
      let queryForSignUp = `INSERT INTO "Users" ("user", "password") VALUES ('${req.body.user}', '${req.body.pass}')`;
      pool.query(queryForSignUp, (err, result) => {
        if (err) return next();
        return next();
      })
    })
  });
};

module.exports = {
  verifyUser,
  createUser
};