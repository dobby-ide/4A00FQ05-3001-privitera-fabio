//Callback Hell
const fs = require('fs');
const directory = '.';
fs.readdir(directory, (err, dir) => {
  if (err) console.log('error reading directory');
  else {
    console.log(dir);
    dir.forEach((files) => {
      fs.readFile(files, 'utf-8', (error, fileread) => {
        if (error) console.log('error reading files');
        else {
          console.log(fileread);
        }
      });
    });
  }
});
