const Pool = require("pg").Pool;
const uuidv4 = require('uuid/v4')
let url =
	"postgres://kpbrjtvt:tmU2ixXRIwrYp1_uBqvugQbY18KfYQwi@otto.db.elephantsql.com:5432/kpbrjtvt";
const pool = new Pool({
	connectionString: url
});

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
  console.log(req.cookies)
  const queryForCookie = `SELECT * from sessions WHERE cookieID = '${req.cookies.dinderCookie}'`
  pool.query(queryForCookie, (err, result)=> {
    if (err) return next(err);
    res.locals.signedIn = true;
    console.log(res.locals.signedIn);
    return next();
  })
}

sessionController.startSession = (req, res, next) => {
  let cookie = uuidv4();
  const queryForCookie = `INSERT INTO sessions ("cookieId", "user") VALUES ('${cookie}', '${req.body.user}') ON CONFLICT ("user") DO UPDATE SET "cookieId" = '${cookie}'`;
  pool.query(queryForCookie, (err, result)=> {
    if (err) return next (err);
    res.cookie('dinderCookie', cookie);
    return next()
  })
};

module.exports = sessionController;