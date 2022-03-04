export default {
  dev: {
    '/api': {
      target: 'http://www.downdemo.com/api',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
};
