/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();


const routing = router.get('/', (req, res) => {
  res.send('1');
});

module.exports = routing;
