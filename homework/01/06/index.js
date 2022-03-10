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
async function readFiles(path) {
  try {
    const files = await readFilesFromDir(path);
    console.log(files);
    const filename = await Promise.all(files.map((a) => readingFiles(a)));

    filename.forEach((res) => console.log(res));
  } catch (err) {
    if (err) console.log(err);
  }
}
readFiles('.');
