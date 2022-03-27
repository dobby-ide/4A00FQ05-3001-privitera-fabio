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
  required: ['latitude', 'longitude'],
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
const getAllLocations = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: dummyData.length,
    locations: dummyData,
  });
};
const getLocation = (req, res) => {
  id = req.params.id;
  let found = dummyData.find((location) => Number(location.id) === Number(id));
  if (found) {
    res.status(200).json({
      status: 'success',
      results: 1,
      location: found,
    });
  } else {
    res.status(404).send('<h1>not found</h1>');
  }
};
const deleteLocation = (req, res) => {
  id = req.params.id;
  let newDb = dummyData.filter((location) => location.id != id);

  console.log(newDb);
  if (newDb.length != dummyData.length) {
    dummyData = [...newDb];
    res.status(204).json({ id: id, status: 'deleted' });
  } else {
    res.status().send('<h1>Cannot delete</h1>');
  }
};
const postLocation = (req, res) => {
  let location = req.body;
  const valid = validate(location);
  if (valid) {
    let id = dummyData[dummyData.length - 1].id + 1;
    let locationWithId = {
      id: id,
      latitude: location.latitude,
      longitude: location.longitude,
    };
    dummyData.push(locationWithId);
    res.status(201).json({
      STATUS: 'SUCCESS',
      data: locationWithId,
    });
  } else {
    res.status(400).end();
  }
};
app.route("/locations").get(getAllLocations).post(postLocation);
app.route('/locations/:id([0-9]+)').delete(deleteLocation).get(getLocation);

//app.get('/locations/:id([0-9]+)', getLocation);
//app.delete('/locations/:id([0-9]+)', deleteLocation);
//app.post('/locations', postLocation);
//app.use('/locations', locations);
const server = app.listen(3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});
