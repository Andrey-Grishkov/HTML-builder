const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, "styles"), (err, files) => {
  if (err) throw err;

  fs.readFile(path.join(__dirname, "project-dist", "bundle.css"), (err, files) => {

    if (err) {
      fs.writeFile(path.join(__dirname, "project-dist", "bundle.css"), '', err => {
        if (err) throw err;
      })
    }

    fs.truncate(path.join(__dirname, "project-dist", "bundle.css"), 0, err => {
      if (err) throw err;
    })
  })

  files.forEach(file => {

    fs.stat(path.join(__dirname, "styles", file), (err, stats) => {
      if (err) throw err;
      if(path.extname(file) !== ".css"){

      } else {

        fs.readFile(path.join(__dirname, "project-dist", "bundle.css"), (err, files) => {

          if (err) {
            fs.writeFile(path.join(__dirname, "project-dist", "bundle.css"), '', err => {
              if (err) throw err;
            })
          }

              fs.readFile(path.join(__dirname, "styles", file), "utf-8", (err, text) => {
                if (err) throw err;
                fs.appendFile(path.join(__dirname, "project-dist", "bundle.css"), text, err => {
                  if (err) throw err;
                })
              })
          })
      }
    });
  });
})

