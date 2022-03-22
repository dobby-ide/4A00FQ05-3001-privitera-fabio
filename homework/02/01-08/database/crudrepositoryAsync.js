const mysql = require('mysql');
require('dotenv').config();
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
  multipleStatements: true,
});
const idSchema = {
  type: 'array',
  items: [
    {
      type: 'number',
      minimum: -90,
      maximum: 90,
    },
    {
      type: 'number',
      minimum: -180,
      maximum: 180,
    },
  ],
};

const Validator = require('jsonschema').Validator;
const validator = new Validator();

let connectionFunctions = {
  connect: () => {
    function myProm(resolve, reject) {
      connection.connect((err, result) => {
        resolve(result);
        reject(err);
      });
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
    const validation = validator.validate(location, idSchema);

    function myProm(resolve, reject) {
      connection.query(
        `insert into locations(latitude,longitude) values(
      ${location[0]}, ${location[1]}
    );`,
        (err, saving) => {
          if (validation.errors.length == 0) {
            if (saving) {
              resolve(saving);
            }
          } else {
            reject(err);
          }
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
          if (result.affectedRows == 1) {
            resolve(result);
          } else {
            reject(err);
          }
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
          if (result) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    }
    return new Promise(myProm);
  },
};

module.exports = connectionFunctions;
