const proxy = require('http-proxy-middleware');
const config = require("./config.js");

module.exports = function(app) {
  app.use(proxy('/auth/callback', { target: config.AUTH_BASE_URL }));
  app.use(proxy('/signin', { target: config.AUTH_BASE_URL }));
  app.use(proxy('/create-pdf', { target: config.PDF_GENARATION_SERVICE_URL }));
};
