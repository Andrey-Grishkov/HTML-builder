const {stdout} = process;
const path = require('path');
const fs = require('fs');

fs.readFile(
  path.join(__dirname, '', 'text.txt'),
  'utf-8',
  (err, text) => {
    if (err) throw err;
    stdout.write(text.toString());
  }
);
