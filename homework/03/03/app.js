/* eslint-disable no-unused-vars */

const express = require('express');

const locations = require('./routes/locations.js');

//console.log(locations);
const app = express();

app.use('/locations', locations);
const server = app.listen(3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});
