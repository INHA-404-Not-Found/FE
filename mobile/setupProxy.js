const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://lost-inha.kro.kr',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    })
  );
};