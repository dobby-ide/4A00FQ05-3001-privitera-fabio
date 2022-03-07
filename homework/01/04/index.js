const fs = require('fs');

function readingFiles(file) {
  function myFunct(resolve, reject) {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) reject(err);
      if (data) resolve(data);
    });
  }
  const promise = new Promise(myFunct);
  return promise;
}

readingFiles('package.json')
  .then((file) => console.log(file))
  .catch((err) => console.log(err));
