// function doSomethingThatTakesTime() {
//   function myFunc(resolve, reject) {
//     let value = Math.floor(Math.random() * 2);
//     if (value === 0) {
//       resolve('We are done');
//     } else {
//       reject('Something went wrong');
//     }
//   }
//   let promise = new Promise(myFunc);
//   return promise;
// }
// doSomethingThatTakesTime()
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));
const fs = require('fs');

function readFilesFromDir(path) {
  function myFunc(resolve, reject) {
    fs.readdir(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  }
  let promise = new Promise(myFunc);
  return promise;
}
readFilesFromDir('.')
  .then((files) => console.log(files))
  .catch((error) => console.log(error));
