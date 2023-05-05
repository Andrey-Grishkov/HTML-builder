const {stdout, stdin, stderr} = process;
const fs = require('fs');
const path = require('path');

fs.readFile(
  path.join(__dirname, '', 'text.txt'),
  'utf-8',
  (err, text) => {

    if (err) {
      fs.writeFile(
        path.join(__dirname, '', 'text.txt'), '',
        (err) => {
          if (err) throw err;
        }
      );
    }
    stdout.write("Введите текст\n");
    stdin.on('data', data => {
      if (data.toString().trim() === 'exit') {
        process.on("exit", (code)=> {
          if(code === 0){
            stdout.write("\nДо свиданья!")
          } else {stderr.write("Errore!!!")}
        });
        process.exit(0);
      }

      fs.appendFile(path.join(__dirname, '', 'text.txt'), data.toString(), (err) => {
        if (err) throw err;
      }
      )
    })
  }
);

process.on('SIGINT', () => {
  console.log("\nДо свиданья!");
  process.exit();
});
