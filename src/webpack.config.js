let webpack_config = process.env.NODE_ENV === "development" ? require("./config/webpack.dev.js") : require("./config/webpack.prod.js");

module.exports = webpack_config;