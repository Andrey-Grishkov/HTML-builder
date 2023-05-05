const path = require("path");
const fs = require("fs");

console.log(path.parse(__filename));
console.log(path.join(__dirname, "secret-folder"));

fs.readdir(path.join(__dirname, "secret-folder"), (err, files) => {
  if (err) throw err;

  console.log('\nСписок файлов в директории secret-folder:\n');

  files.forEach(file => {

    fs.stat(path.join(__dirname, "secret-folder", file), (err, stats) => {
      if (err) throw err;
      if (stats.isDirectory()) {
      } else {
        console.log(`${path.basename(file)} - ${path.extname(file).slice(1)} - ${stats.size/1000}kb`);
      }
    });
  });
});
