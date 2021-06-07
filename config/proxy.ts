
export default {
  dev: {
    '/api': {
      target: 'http://p.chaomeifan.com/api',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  }
};
