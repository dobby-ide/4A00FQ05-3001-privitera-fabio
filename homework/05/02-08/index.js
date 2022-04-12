//type npm start to start the server

const express = require('express');
var cors = require('cors');
const app = express();

app.use(express.static('frontend/build'));
app.use(express.json());
app.use(cors()); //enables CORS from all origins
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   console.log('Time:', Date.now());
//   next();
// });

require('dotenv').config();
//creating the connections to database

const database = require('./crudrepository');
//find all
app.route('/locations').get(async (req, res) => {
  try {
    const result = await database.findAll();
    console.log(result.length);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});
//filter
app.route('/filter').get(async (req, res) => {
  try {
    const result = await database.filterResults(
      req.query.latitude,
      req.query.longitude
    );
    console.log(result.length);
    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(404).end();
  }
});
//sort
app.route('/sort').get(async (req, res) => {
  try {
    console.log(req.query.sort);
    let myreq = req.query.sort.substring(0, 1);
    console.log(myreq);
    if (myreq === '-') {
      const result = await database.sortResults(req.query.sort);
      res.status(200).send(result);
    } else {
      let sqlToAdd = 'ASC';
      const result = await database.sortResults(
        req.query.sort + ' ' + sqlToAdd
      );
      res.status(200).send(result);
    }
  } catch (err) {
    res.status(404).end();
  }
});
//save
app.route('/locations').post(async (req, res) => {
  console.log(req.body);
  const resourceToSend = req.body;
  console.log(resourceToSend);
  const result = await database.save(resourceToSend);
  res.send(result);
});
//find a single location async
app.route('/locations/:id').get(async (req, res) => {
  id = req.params.id;

  const foundSingleResource = await database.findLocation(id);
  if (foundSingleResource[0]) {
    res.send(foundSingleResource);
  } else {
    res.status(404).end();
  }
});

app.route('/locations/:id').delete(async (req, res) => {
  id = req.params.id;
  try {
    const deletedLocation = await database.deleteLocation(id);
    res.send(deletedLocation);
  } catch (err) {
    console.log(err);
    console.log('nothing deleted');
    res.status(404).end();
  }
});

const server = app.listen(3000, () => {
  console.log(`Listening on port ${server.address().port}`);
  database.connect((err) => {
    if (err) {
      console.log('problem connecting');
    } else {
      console.log('MySQL connection succesful');
    }
  });
});
