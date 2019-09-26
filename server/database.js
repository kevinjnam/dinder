const Pool = require("pg").Pool;
let url =
	"postgres://kgcddhnh:KavuQz1fDvPlhVJdFwZbiLQMkMm2n_tY@salt.db.elephantsql.com:5432/kgcddhnh";
const pool = new Pool({
	connectionString: url
});

module.exports = pool;