// const Pool = require("pg").Pool;
// let url =
// 	"postgres://kgcddhnh:KavuQz1fDvPlhVJdFwZbiLQMkMm2n_tY@salt.db.elephantsql.com:5432/kgcddhnh";
// const pool = new Pool({
// 	connectionString: url
// });

const pool = require('../Database.js')

// const SALT_WORK_FACTOR = 10;
// const bcrypt = require('bcryptjs');


const verifyUser = (req, res, next) => {
  console.log('verifying');
	let arr = [req.body.user];
	let queryforPass = `SELECT "password" FROM "Users" WHERE "user" = $1`;
	pool.query(queryforPass, arr, (err, result) => {
		if (err) console.log("no result for user found");
		console.log('here in query for verify user', result.rows[0])
		if (result.rows[0].password === req.body.pass) {
			return next();
		}
		return res.send("Not Verified");
	});
};

const createUser = (req, res, next) => {
	let arr = [req.body.user, req.body.pass];
	let queryForSignUp = `INSERT INTO "Users" ("user","password") VALUES ($1,$2)`;
	pool.query(queryForSignUp, arr, (err, result) => {
		if (err) console.log("QUERY NOT FOUND");
		return next();
	});
};

module.exports = {
	verifyUser,
  createUser
};
