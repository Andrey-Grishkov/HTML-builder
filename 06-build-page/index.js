const fs = require('fs');
const path = require('path');

//Копируем стили
fs.readdir(path.join(__dirname, "styles"), (err, files) => {
  if (err) throw err;

  fs.readFile(path.join(__dirname, "project-dist", "styles.css"), (err, files) => {

    //Создаем папку и фаил стилей в ней
    if (err) {
      fs.mkdir(path.join(__dirname, "project-dist"), err => {if (err) throw err;});
      fs.writeFile(path.join(__dirname, "project-dist", "styles.css"), '', err => {
        if (err) throw err;
      })
    }

    //Очищаем фаил стилей
    fs.truncate(path.join(__dirname, "project-dist", "styles.css"), 0, err => {
      if (err) throw err;
    })
  })

  //Собираем код из всех фаилов стилей
  files.forEach(file => {


    //Проверяем формат всех фаилов
    fs.stat(path.join(__dirname, "styles", file), (err, stats) => {
      if (err) throw err;
      if(path.extname(file) !== ".css"){

      } else {

        //Записываем все собранные стили в новый фаил
        fs.readFile(path.join(__dirname, "project-dist", "styles.css"), (err, files) => {

          if (err) throw err;

          fs.readFile(path.join(__dirname, "styles", file), "utf-8", (err, text) => {
            if (err) throw err;
            fs.appendFile(path.join(__dirname, "project-dist", "styles.css"), text, err => {
              if (err) throw err;
            })
          })
        })
      }
    });
  });
})

//Создаем папку assets (пытаемся узнать статистику по папке)
fs.stat(path.join(__dirname, `project-dist\\assets`), (err, stat) => {
  //Если такой папки нет, то создаем эту папку
  if (err) {
    fs.mkdir(path.join(__dirname, "project-dist\\assets"), err => {
      if (err) throw err;
    });
  }
})

//Теперь удалим все содержимое папки, если оно есть
fs.readdir(path.join(__dirname, "project-dist\\assets"), (err, directories) => {
  if (err) throw err;

if(directories){

  //Для каждой подпапки
  directories.forEach( dir => {

    fs.readdir(path.join(__dirname, `project-dist\\assets\\${dir.toString()}`), (err, files) => {
      if (err) throw err;

      //Если в папке есть фаилы, то удаляем их
      if(files){
        files.forEach(file => {
          fs.unlink(path.join(__dirname, `project-dist\\assets\\${dir.toString()}`, file), err => {
            if (err) throw err;
          })
        })
      }
      //Если в папке нет фаилов, то удаляем папку
      else {
        console.log("privet")
        fs.rmdir(path.join(__dirname, `project-dist\\assets\\${dir.toString()}`), (err) => {
          if (err) throw err;
        })
      }
    })
  })
}
})

//Копируем папки с картинками, шрифтами и т.д.
//Залезаем в папку
fs.readdir(path.join(__dirname, "assets"), (err, directories) => {
  if (err) throw err;

  //Для каждой подпапки
  directories.forEach( dir => {

      //Залезаем в подпапку
      fs.readdir(path.join(__dirname, `assets\\${dir.toString()}`), (err, files) => {
        if (err) throw err;

          //Для каждого фаила
          files.forEach( file => {

            //Создаем подпапки
            fs.readFile(path.join(__dirname, `project-dist\\assets\\${dir.toString()}`, file), (err, files) => {

              //Создаем подпапки и фаилы в них
              if (err) {


                //Создаем подпапку (пытаемся узнать статистику по папке)
                fs.stat(path.join(__dirname, `project-dist\\assets\\${dir.toString()}`), (err, stat) => {

                  //Если такой папки нет, то создаем эту папку
                  if (err) {
                    fs.mkdir(path.join(__dirname, `project-dist\\assets\\${dir.toString()}`), err => {
                      if (err) throw err;
                    });
                  }
                })

                  //Создаем фаилы в папке
                fs.writeFile(path.join(__dirname, `project-dist\\assets\\${dir.toString()}`, file), '', err => {
                  if (err) throw err;
                })
              }})

            //Читаем текущий фаил и записываем его содержимый в новый
            fs.readFile(path.join(__dirname, `assets\\${dir.toString()}`, file), "utf-8", (err, text) => {
              if (err) throw err;
              fs.appendFile(path.join(__dirname, `project-dist\\assets\\${dir.toString()}`, file), text, err => {
                if (err) throw err;
              })
            })
          });
      })
  })
})

//Читаем наш template
fs.readFile(path.join(__dirname, "template.html"), "utf-8", (err, text) => {
  if (err) throw err;

  //Создаем новый html
  fs.writeFile(path.join(__dirname, "project-dist", "index.html"), '', err => {
    if (err) throw err;
  })

  fs.readFile(path.join(__dirname, "project-dist", "index.html"), (err, files) => {

    if (err) throw err;

      //Стираем все из фаила
      fs.truncate(path.join(__dirname, "project-dist", "index.html"), 0, err => {
        if (err) throw err;
      })

      //Добавляем новую инфу из индекса
      fs.appendFile(path.join(__dirname, "project-dist", "index.html"), text.toString(), err => {
        if (err) throw err;
      })

      //Теперь заменяем header
      fs.readFile(path.join(__dirname, "components", "header.html"), "utf-8", (err, headerText) => {
        if (err) throw err;

        fs.readFile(path.join(__dirname, "components", "articles.html"), "utf-8", (err, articlesText) => {

          if (err) throw err;

          fs.readFile(path.join(__dirname, "components", "footer.html"), "utf-8", (err, footerText) => {
            if (err) throw err;

            fs.readFile(path.join(__dirname, "project-dist", "index.html"), "utf-8", (err, indexText) => {
              if (err) throw err;

              indexText = indexText.replace('{{header}}', headerText);
              indexText = indexText.replace('{{articles}}', articlesText);
              indexText = indexText.replace('{{footer}}', footerText);

              fs.writeFile(path.join(__dirname, "project-dist", "index.html"), indexText, err => {
                if (err) throw err;
              })
            })
          })
          })
      })
  })
})
