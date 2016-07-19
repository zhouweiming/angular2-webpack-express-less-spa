let app_config = require("./config/app");
let ejs = require("ejs");
let express = require("express");
let path = require('path');
let app = express();
let router = express.Router();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

router.get(/^(?!\/public\/).*?$/, (req, res) => {
  res.render("layout", {
    layout: false,
    title: "IERMU管理平台",
    env: process.env.NODE_ENV,
    baseurl: process.env.NODE_ENV === "dev" ? `http://localhost:${app_config.port}` : "/"
  });
});

if (process.env.NODE_ENV === "dev") {
  let webpack = require('webpack'),
    webpackDevServer = require('webpack-dev-server'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackDevConfig = require('./webpack.config.js');
  let compiler = webpack(webpackDevConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
      colors: true
    }
  }));
  app.use(webpackHotMiddleware(compiler));
  app.use(router);
  let bs = require('browser-sync').create();
  app.listen(app_config.port, () => {
    bs.init({
      open: false,
      ui: false,
      notify: false,
      proxy: 'localhost:' + app_config.port,
      files: ['./views/**'],
      port: app_config.proxy_port
    })
  })
} else {
  app.use('/public', express.static(path.join(__dirname, 'public')));
  app.use(router);
  app.listen(app_config.port);
}
module.exports = app;