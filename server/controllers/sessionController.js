const Pool = require("pg").Pool;
const uuidv4 = require('uuid/v4')
let url =
	"postgres://kpbrjtvt:tmU2ixXRIwrYp1_uBqvugQbY18KfYQwi@otto.db.elephantsql.com:5432/kpbrjtvt";
const pool = new Pool({
	connectionString: url
});

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
  const queryForCookie = `SELECT * from sessions WHERE "cookieId" = '${req.headers.cookie.slice(13)}'`
  pool.query(queryForCookie, (err, result)=> {
    if (err) return next(err);
  
    res.locals= result.rows[0];
    console.log('res.locals after setting rows', res.locals);
    res.locals.verified = 'verified';
    console.log('here this breaks')
    return next();
  })
}

sessionController.startSession = (req, res, next) => {
  let cookie = uuidv4();
  const queryForCookie = `INSERT INTO sessions ("cookieId", "user") VALUES ('${cookie}', '${req.body.user}') ON CONFLICT ("user") DO UPDATE SET "cookieId" = '${cookie}'`;
  pool.query(queryForCookie, (err, result)=> {
    if (err) return next (err);
    res.cookie('dinderCookie', cookie ,{httpOnly: true});
    return next()
  })
};

sessionController.signOut = (req, res, next) => {
  console.log('hit 1')
  const queryForCookie = `DELETE FROM sessions WHERE "user" = '${req.body.user}'`
  pool.query(queryForCookie, (err, result) => {
    if (err) return next(err);
    res.locals.signedOut = 'signedOut'
    return next();
  })
}

module.exports = sessionController;