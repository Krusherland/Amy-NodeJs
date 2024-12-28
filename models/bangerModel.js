var pool = require("./dataBase");

async function getBangers() {
  var query = "select * from bangers";
  var rows = await pool.query(query);
  return rows;
}

async function deleteBanger(id) {
  var query = "delete FROM bangers WHERE id =?";
  var rows = await pool.query(query, [id]);
  return rows;
}

async function addBanger(obj) {
  try {
    var query = "insert INTO bangers SET ?";
    var rows = await pool.query(query, [obj]);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getBangerById(id) {
  var query = "select * from bangers WHERE id =?";
  var rows = await pool.query(query, [id]);
  return rows[0];
}

async function updateBanger(id, obj) {
  try {
    var query = "update bangers SET? WHERE id =?";
    var rows = await pool.query(query, [obj, id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
}
module.exports = { getBangers, deleteBanger, addBanger, getBangerById, updateBanger };