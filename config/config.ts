// https://umijs.org/config/
import { defineConfig } from 'umi';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;

export default defineConfig({
  base: '/',
  publicPath: '/',
  hash: false,
  antd: {},
  // publicPath: process.env.NODE_ENV === 'production' ? '/1.0.0/' : '/',
  history: {
    type: 'hash',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/pageLoading',
  },
  theme: {
    'primary-color': '#1DA57A',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '@/components/layout',
      routes: [
        {
          path: '/',
          redirect: '/index',
        },
        {
          path: '/index',
          name: 'index',
          component: './home',
        },
        {
          path: '/detail',
          name: 'detail',
          component: './detail',
          title: '模板详情',
        },
        {
          component: '404',
        },
      ],
    },
    {
      component: '404',
    },
  ],
  title: '模板下载',
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  tailwindcss: {
    tailwindCssFilePath: '@/assets/less/tailwind.css',
    tailwindConfigFilePath: 'tailwind.config.js', // 默认取值 tailwindConfigFilePath || join(process.env.APP_ROOT || api.cwd, 'tailwind.config.js'),
  },
});
