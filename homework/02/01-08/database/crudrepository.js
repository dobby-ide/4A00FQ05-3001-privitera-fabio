const mysql = require('mysql');
require('dotenv').config();
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
  multipleStatements: true,
});
let connectionFunctions = {
  connect: (callback) => {
    connection.connect((err, result) => {
      callback(result);
    });
  },
  close: (callback) => {
    connection.end((err) => {
      if (err) {
        callback(err);
      }
      console.log('connection is closed');
    });
  },
  save: (location, callback) => {
    connection.query(
      `insert into locations(latitude,longitude) values(
      ${location[0]}, ${location[1]}
    );`,
      (err, saving) => {
        callback(saving);
      }
    );
  },
  findAll: (callback) => {
    connection.query('select * from locations', (err, locations) => {
      callback(locations);
    });
  },
  deleteById: (id, callback) => {
    connection.query(
      `delete from locations where id = ${id};`,
      (err, result) => {
        callback(result);
      }
    );
  },
  findById: (id, callback) => {
    connection.query(
      `select * from locations where id = ${id};`,
      (err, result) => {
        callback(result);
      }
    );
  },
};

module.exports = connectionFunctions;
