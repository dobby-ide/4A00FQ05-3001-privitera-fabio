const connection = require('./database/crudrepository.js');
const location = [20, 30];

const main = () => {
  connection.connect((result) => console.log(result));
  connection.findAll((result) => console.log(result));
  connection.save(location, (result) => console.log(result));
  connection.deleteById(3, (result) =>
    console.log('affected Rows: ' + result.affectedRows)
  );
  connection.findById(7, (result) => console.log(result));
  connection.close((err) => console.log(err));
};
main();
// var readlineSync = require('readline-sync');
// const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DB,
//   multipleStatements: true,
// });

// connection.connect();

// // Wait for user's response.
// var id = readlineSync.question('id: ');

// // connection.query(`select * from locations WHERE id=${id}`, (err, coords) => {
// //placeholder add to escape, now ? refers strictly to id in table locations
// //so if user types "1 or true" it will
// connection.query(`select * from locations WHERE id= ?`, [id], (err, coords) => {
//   if (err) {
//     throw err;
//   }
//   coords.forEach((coord) =>
//     console.log(`${coord.longitude} ${coord.latitude}`)
//   );
// });

// // will wait if previously enqueued queriest
// connection.end();
