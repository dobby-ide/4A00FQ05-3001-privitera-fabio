/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const express = require('express');

const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
  type: 'object',
  properties: {
    latitude: { type: 'integer', minimum: -90, maximum: 90 },
    longitude: { type: 'integer', minimum: -180, maximum: 180 },
  },
};

const validate = ajv.compile(schema);

const locations = require('./routes/locations.js');
let dummyData = [
  { id: 1, latitude: 26, longitude: 30 },
  { id: 2, latitude: 26, longitude: 34 },
  { id: 3, latitude: 26, longitude: 34 },
  { id: 4, latitude: 56, longitude: 64 },
  { id: 5, latitude: 55, longitude: 64 },
  { id: 6, latitude: 51, longitude: 67 },
  { id: 7, latitude: 52, longitude: 67 },
  { id: 8, latitude: 22, longitude: 37 },
  { id: 9, latitude: 24, longitude: 37 },
  { id: 10, latitude: 20, longitude: 30 },
];
const app = express();
//adding a middleware to make the string passed to work as a json
app.use(express.json());
app.get('/locations', (req, res) => {
  res.send(dummyData);
});
app.get('/locations/:id([0-9]+)', (req, res) => {
  id = req.params.id;
  let found = dummyData.find((location) => Number(location.id) === Number(id));
  if (found) {
    res.send(found);
  } else {
    res.send('<h1>not found</h1>');
  }
});
app.delete('/locations/:id([0-9]+)', (req, res) => {
  id = req.params.id;
  let newDb = dummyData.filter((location) => location.id != id);

  console.log(newDb);
  if (newDb.length != dummyData.length) {
    dummyData = [...newDb];
    res.send({ id: id, status: 'deleted' });
  } else {
    res.send('<h1>Cannot delete</h1>');
  }
});
//so when app is receiving that post http request........ from req.body
app.post('/locations', (req, res) => {
  let location = req.body;
  const valid = validate(location);
  if (valid) {
    dummyData.push(location);
    res.status(201).send(location);
  } else {
    res.status(400).end();
  }
});
app.use('/locations', locations);
const server = app.listen(3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});
