const { createProxyMiddleware } = require("http-proxy-middleware");
const proxy = {
  target: "https://gubnma65b5.execute-api.eu-central-1.amazonaws.com",
  changeOrigin: true,
};
module.exports = function (app) {
  app.use("/test/bet", createProxyMiddleware(proxy));
};
