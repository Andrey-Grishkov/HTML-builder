const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, "files-copy"), (err, files) => {
  if (err) {
    fs.mkdir(path.join(__dirname, 'files-copy'), err => {
      if (err) throw err;
    })
  }

if(files){
  files.forEach(file => {
    fs.unlink(path.join(__dirname, 'files-copy', file), err => {
      if (err) throw err;
    })
  })
}

  fs.readdir(path.join(__dirname, "files"), (err, files) => {
    if (err) throw err;

    files.forEach(file => {

      fs.readFile(path.join(__dirname, "files", file), (err, data) => {
        if (err) throw err;

        fs.writeFile(path.join(__dirname, "files-copy", file), data, (err) => {
          if (err) throw err;
        });})
    })})
})


