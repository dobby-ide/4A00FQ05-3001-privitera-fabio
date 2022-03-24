const express = require('express');
const app = express();
const port = 3000;
var router = express.Router();
const location = { id: 1, latitude: 60, longitude: 60 };
// router.get('/mikkihiiri', (req, res) => {
//   res.send('router');
// });
router.get('/1', (req, res) => {
  res.send(location);
});
//passing a routing path that is processed above
app.use('/location', router);
// app.use('/hello', (req, res, next) => {
//   console.log('hello');
//   next();
// });

// app.use('/world', (req, res, next) => {
//   console.log('world');
//   next();
// });
app.get('/', function (req, res) {
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
