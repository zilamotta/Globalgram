const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.jigsawstack.com/v1/ai',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};