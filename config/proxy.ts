export default {
  dev: {
    '/api': {
      target: 'http://z.gc.chaomeifan.com/api',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
};
