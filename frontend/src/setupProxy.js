const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
  target: 'https://api.project44.mayflower.tech',
  changeOrigin: true
}
module.exports = function(app) {
  app.use(
    '/bet',
    createProxyMiddleware(proxy)
  );
};
