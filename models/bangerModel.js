var pool = require('./dataBase');

async function getBangers() {
    var query = 'select * from bangers';
    var rows = await pool.query(query);
    return rows;
}

module.exports = {getBangers}