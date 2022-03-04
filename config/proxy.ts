export default {
  dev: {
    '/api': {
      target: 'http://api.downdemo.com/api',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
};
