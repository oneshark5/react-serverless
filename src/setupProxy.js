const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // 过滤拼接：请求api开头时代理到7001端口上
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:7001',
      changeOrigin: true,
    })
  );
};