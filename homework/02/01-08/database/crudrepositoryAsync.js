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
  connect: () => {
    function myProm(resolve, reject) {
      connection.connect((err, result) => resolve(result));
    }

    return new Promise(myProm);
  },
  close: () => {
    function myProm(resolve, reject) {
      connection.end((err) => {
        if (err) reject(err);

        console.log('connection is closed');
      });
    }
    return new Promise(myProm);
  },
  save: (location) => {
    function myProm(resolve, reject) {
      connection.query(
        `insert into locations(latitude,longitude) values(
      ${location[0]}, ${location[1]}
    );`,
        (err, saving) => {
          resolve(saving);
        }
      );
    }
    return new Promise(myProm);
  },
  findAll: () => {
    function myProm(resolve, reject) {
      connection.query('select * from locations', (err, result) =>
        resolve(result)
      );
    }

    return new Promise(myProm);
  },
  deleteById: (id) => {
    function myProm(resolve, reject) {
      connection.query(
        `delete from locations where id = ${id};`,
        (err, result) => {
          resolve(result);
        }
      );
    }
    return new Promise(myProm);
  },
  findById: (id) => {
    function myProm(resolve, reject) {
      connection.query(
        `select * from locations where id = ${id};`,
        (err, result) => {
          resolve(result);
        }
      );
    }
    return new Promise(myProm);
  },
};

module.exports = connectionFunctions;
