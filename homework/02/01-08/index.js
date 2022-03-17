require('dotenv').config();

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
  multipleStatements: true,
});

connection.connect();

connection.query('select * from locations', (err, coords) => {
  if (err) {
    throw err;
  }
  coords.forEach((coord) =>
    console.log(`${coord.longitude} ${coord.latitude}`)
  );
});

// will wait if previously enqueued queriest
connection.end();
