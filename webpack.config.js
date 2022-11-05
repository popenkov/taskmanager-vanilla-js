const path = require(`path`);
module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`),
  },
  devtool: `source-map`, // Подключаем sourcemaps
  devServer: {
    contentBase: path.join(_dirname, `public`),
    // Где искать сборку
    // Автоматическая перезагрузка страницы
    // По умолчанию приложение будет доступно по адресу http:
    //localhost:8080
    // Лучше открывать в режиме инкогнито, чтобы браузер не кэшировал файлы сборки
    watchContentBase: true,
  },
};
