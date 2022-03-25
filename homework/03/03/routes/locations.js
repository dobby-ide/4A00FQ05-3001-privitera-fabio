/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();

const routing = router.get('/1', (req, res) => {
  console.log('hit');
  res.send('1');
});

module.exports = routing;
