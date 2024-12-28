var pool = require('./dataBase');
var md5 = require('md5');

async function getUserAndPassword(user, password) {
  try {
    var query = "SELECT * FROM user WHERE name = ? and password = ? limit 1";
    var rows = await pool.query(query, [user, md5(password)]);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

module.exports = {getUserAndPassword};