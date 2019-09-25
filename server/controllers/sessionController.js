const Pool = require("pg").Pool;
const uuidv4 = require('uuid/v4')
let url =
	"postgres://kpbrjtvt:tmU2ixXRIwrYp1_uBqvugQbY18KfYQwi@otto.db.elephantsql.com:5432/kpbrjtvt";
const pool = new Pool({
	connectionString: url
});

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
<<<<<<< HEAD
  console.log(req.cookies)
  const queryForCookie = `SELECT * from sessions WHERE cookieID = '${req.cookies.dinderCookie}'`
  pool.query(queryForCookie, (err, result)=> {
    if (err) return next(err);
    res.locals.signedIn = true;
    console.log(res.locals.signedIn);
=======
  const queryForCookie = `SELECT * from sessions WHERE "cookieId" = '${req.headers.cookie.slice(13)}'`
  pool.query(queryForCookie, (err, result)=> {
    if (err) return next(err);
    res.locals= result.rows[0];
    res.locals.verified = 'verified';
>>>>>>> e1d75b22c381befffc4da75f717fbfbe702ca456
    return next();
  })
}

sessionController.startSession = (req, res, next) => {
  let cookie = uuidv4();
  const queryForCookie = `INSERT INTO sessions ("cookieId", "user") VALUES ('${cookie}', '${req.body.user}') ON CONFLICT ("user") DO UPDATE SET "cookieId" = '${cookie}'`;
  pool.query(queryForCookie, (err, result)=> {
    if (err) return next (err);
<<<<<<< HEAD
    res.cookie('dinderCookie', cookie);
=======
    res.cookie('dinderCookie', cookie ,{httpOnly: true});
>>>>>>> e1d75b22c381befffc4da75f717fbfbe702ca456
    return next()
  })
};

<<<<<<< HEAD
=======
sessionController.signOut = (req, res, next) => {
  const queryForCookie = `DELETE FROM sessions WHERE "user" = '${req.body.user}'`
  pool.query(queryForCookie, (err, result) => {
    if (err) return next(err);
    res.locals.signedOut = 'signedOut'
    return next();
  })
}

>>>>>>> e1d75b22c381befffc4da75f717fbfbe702ca456
module.exports = sessionController;