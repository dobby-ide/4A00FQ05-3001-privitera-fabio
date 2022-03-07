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
let arr = [readingFiles('package.json'), readingFiles('index.js')];
// let promise = Promise.all(arr);
// promise
//   .then((allContent) => console.log(allContent))
//   .catch((err) => console.log(err));
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
  .then((files) => Promise.all(files.map((a) => readingFiles(a))))
  .then((contentArr) => contentArr.forEach((content) => console.log(content)))
  .catch((err) => console.log(err));
