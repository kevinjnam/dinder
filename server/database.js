const Pool = require('pg').Pool;
const pool = new Pool({
 connectionString:'postgres://hddufohk:1ur6fgrvf7bVO_oN61Qbd-xr5gBuk_mi@salt.db.elephantsql.com:5432/hddufohk'
});

module.exports = pool;