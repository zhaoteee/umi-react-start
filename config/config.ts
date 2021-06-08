// https://umijs.org/config/
import { defineConfig } from 'umi';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
const productionPublicPath = '//misc.hzzcckj.cn/skin/cg/1.0.0/';

export default defineConfig({
  base: REACT_APP_ENV === 'test' ? '/' : '/',
  publicPath: REACT_APP_ENV === 'dev' || REACT_APP_ENV === 'test' ? '/' : productionPublicPath,
  hash: true,
  antd: {},
  // publicPath: process.env.NODE_ENV === 'production' ? '/1.0.0/' : '/',
  history: {
    type: 'browser',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  "theme": {
    "primary-color": "#FF0036",
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        {
          path: '/',
          redirect: '/mall',
        },
        {
          path: '/mall',
          name: 'mall',
          component: './home',
          title: '首页'
        },
        {
          path: '/mall/cart',
          name: 'mallCart',
          component: './cart',
          title: "购物车"
        },
        {
          path: '/mall/order',
          name: 'mallOrder',
          component: './order',
          title: "订单"
        },
        {
          component: '404',
        }
      ]
    },
    {
      component: '404',
    }
  ],
  title: '采购商城',
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
});
