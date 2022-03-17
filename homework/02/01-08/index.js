require('dotenv').config();
var readlineSync = require('readline-sync');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
  multipleStatements: true,
});

connection.connect();

// Wait for user's response.
var id = readlineSync.question('May I have id? ');

connection.query(`select * from locations WHERE id=${id}`, (err, coords) => {
  if (err) {
    throw err;
  }
  coords.forEach((coord) =>
    console.log(`${coord.longitude} ${coord.latitude}`)
  );
});

// will wait if previously enqueued queriest
connection.end();
