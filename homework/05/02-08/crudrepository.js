const mysql = require('mysql');
const idSchema = {
  type: 'object',
  properties: {
    latitude: {
      type: 'number',
      minimum: -90,
      maximum: 90,
    },
    longitude: {
      type: 'number',
      minimum: -180,
      maximum: 180,
    },
  },
};

const Validator = require('jsonschema').Validator;
const validator = new Validator();
var dbConnection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
  multipleStatements: true,
});
module.exports = {
  connect: () => {
    dbConnection.getConnection((err) => {
      if (err) {
        console.log('Problem connecting to database');
      } else {
        console.log('connection to database successful!');
      }
    });
  },
  findAll: () => {
    function myProm(resolve, reject) {
      dbConnection.query('SELECT * FROM locations', (err, results) => {
        if (results) {
          resolve(results);
        } else {
          reject(console.log(err));
        }
      });
    }
    return new Promise(myProm);
  },
  //filtering
  filterResults: (lat, long) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM locations where latitude = ${lat} AND longitude = ${long} ;`,
        (err, results) => {
          if (results) {
            resolve(results);
          } else {
            reject(err);
          }
        }
      );
    }
    return new Promise(myProm);
  },
  //sorting
  sortResults: (lat) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM locations ORDER BY ${lat}`,
        (err, results) => {
          if (results) {
            resolve(results);
          } else {
            reject(err);
          }
        }
      );
    }
    return new Promise(myProm);
  },
  //filter
  // filterResults: (lat, long) => {
  //   function myProm(resolve, reject) {
  //     dbConnection.query(
  //       `SELECT * FROM locations SORT BY latitude = ${lat} and longitude = ${long}`,
  //       (err, results) => {
  //         if (results) {
  //           resolve(results);
  //         } else {
  //           reject(err);
  //         }
  //       }
  //     );
  //   }
  //   return new Promise(myProm);
  // },
  //finding by id
  findLocation: (id) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `select * from locations where id = ${id};`,
        (err, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(console.log(err));
          }
        }
      );
    }
    return new Promise(myProm);
  },
  //deleteing by id
  deleteLocation: (id) => {
    function myProm(resolve, reject) {
      dbConnection.query(
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
  //saving a new location, id is autoincremented, location needs being given in the form of latitude longitude values, validation is working
  //dev reminder: body given in the request needs being content-type: application/json
  save: (location) => {
    const validation = validator.validate(location, idSchema);

    function myProm(resolve, reject) {
      dbConnection.query(
        `insert into locations (latitude, longitude) values(
      ${location.latitude}, ${location.longitude}
    );`,
        (err, saving) => {
          if (validation.errors.length == 0) {
            if (saving) {
              resolve(saving);
            } else {
              reject(err);
            }
          }
        }
      );
    }
    return new Promise(myProm);
  },
};
