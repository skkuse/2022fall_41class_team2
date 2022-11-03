const { createProxyMiddleware } = require('http-proxy-middleware');

// API 사용시 프록시 설정
module.exports = function(app) {
  app.use(
    '/github',
    createProxyMiddleware({
      target: 'https://github.com',
      changeOrigin: true,
      pathRewrite: {
        "^/github" : ""
      }
    })
  );

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://43.201.114.181:8000',
      changeOrigin: true,
      pathRewrite: {
        "^/api" : ""
      }
    })
  );
};