const fs = require('fs').promises;
const path = require('path');

async function copyStyles() {
  try {
    // Пытаемся прочитать файл styles.css
    await fs.readFile(path.join(__dirname, "project-dist", "style.css"));
  } catch (err) {
    // Если файл не существует, создаем его
    await fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true });
    await fs.writeFile(path.join(__dirname, "project-dist", "style.css"), '');
  }

  // Очищаем файл styles.css
  await fs.truncate(path.join(__dirname, "project-dist", "style.css"), 0);

  // Собираем код из всех файлов стилей
  const styleFiles = await fs.readdir(path.join(__dirname, "styles"));
  for (const file of styleFiles) {
    const fileStats = await fs.stat(path.join(__dirname, "styles", file));

    if (fileStats.isFile() && path.extname(file) === ".css") {
      const text = await fs.readFile(path.join(__dirname, "styles", file), "utf-8");
      await fs.appendFile(path.join(__dirname, "project-dist", "style.css"), text);
    }
  }
}

async function createAssetsFolder() {
  const assetsPath = path.join(__dirname, 'project-dist', 'assets');

  try {
    // Пытаемся получить статистику о папке assets
    await fs.stat(assetsPath);
  } catch (err) {
    // Если папки нет, создаем её
    await fs.mkdir(assetsPath, { recursive: true });
  }

  // Удаляем содержимое папки assets
  const directories = await fs.readdir(assetsPath);
  for (const dir of directories) {
    const dirPath = path.join(assetsPath, dir);
    const files = await fs.readdir(dirPath);

    // Если в папке есть файлы, удаляем их
    if (files.length > 0) {
      for (const file of files) {
        await fs.unlink(path.join(dirPath, file));
      }
    } else {
      // Если в папке нет файлов, удаляем папку
      await fs.rmdir(dirPath);
      console.log(`Папка ${dirPath} удалена`);
    }
  }
}

async function copyAssetsFolders() {
  const assetsPath = path.join(__dirname, 'project-dist', 'assets');
  const sourceAssetsPath = path.join(__dirname, 'assets');

  const directories = await fs.readdir(sourceAssetsPath);

  await Promise.all(directories.map(async (dir) => {
    const dirPath = path.join(sourceAssetsPath, dir);
    const files = await fs.readdir(dirPath);

    // Создаем подпапку и файлы в ней
    const destDirPath = path.join(assetsPath, dir);
    try {
      // Пытаемся получить статистику о подпапке
      await fs.stat(destDirPath);
    } catch (err) {
      // Если подпапки нет, создаем её
      await fs.mkdir(destDirPath, { recursive: true });
    }

    // Копируем файлы
    await Promise.all(files.map(async (file) => {
      const fileContent = await fs.readFile(path.join(dirPath, file));
      await fs.writeFile(path.join(destDirPath, file), fileContent);
    }));
  }));
}

async function updateIndexHtml() {
  const templatePath = path.join(__dirname, "template.html");
  const indexPath = path.join(__dirname, "project-dist", "index.html");

  const [templateText, headerText, articlesText, footerText, aboutText] = await Promise.all([
    fs.readFile(templatePath, "utf-8"),
    fs.readFile(path.join(__dirname, "components", "header.html"), "utf-8"),
    fs.readFile(path.join(__dirname, "components", "articles.html"), "utf-8"),
    fs.readFile(path.join(__dirname, "components", "footer.html"), "utf-8"),
    // Чтение about.html, если файл существует
    fs.readFile(path.join(__dirname, "components", "about.html"), "utf-8").catch(() => ""),
  ]);

  // Заменяем теги в шаблоне
  let indexText = templateText
    .replace('{{header}}', headerText)
    .replace('{{articles}}', articlesText)
    .replace('{{footer}}', footerText)
    .replace('{{about}}', aboutText);

  await fs.writeFile(indexPath, indexText);
}

// Вызываем функции
async function main() {
  await copyStyles();
  await createAssetsFolder();
  await copyAssetsFolders();
  await updateIndexHtml();
}

// Запускаем основную функцию
main().catch((err) => console.error(err));

