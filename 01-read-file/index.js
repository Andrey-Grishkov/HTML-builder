const {stdout} = process;
const path = require('path');
const fs = require('fs');

const stream = fs.createReadStream(path.join(__dirname, "./text.txt"), "utf-8");

stream.on('data', (text) => stdout.write(text));
