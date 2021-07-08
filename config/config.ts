// https://umijs.org/config/
import { defineConfig } from 'umi';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
const productionPublicPath = '//misc.hzzcckj.cn/skin/cg/1.0.0/';

export default defineConfig({
  base: REACT_APP_ENV === 'test' ? '/integral/' : '/',
  publicPath: REACT_APP_ENV === 'dev' || REACT_APP_ENV === 'test' ? '/integral/' : productionPublicPath,
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
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  theme: {
    'primary-color': '#FF0036',
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
          title: '采购商城',
        },
        {
          path: '/mall/cart',
          name: 'mallCart',
          component: './cart',
          title: '购物车',
        },
        {
          path: '/mall/cart/confirm',
          name: 'confirmOrder',
          component: './cart/ConfirmOrder',
          title: '确认订单',
        },
        {
          path: '/mall/cart/paying',
          name: 'payOrder',
          component: './cart/PayingOrder',
          title: '订单支付',
        },
        {
          path: '/mall/cart/payed',
          name: 'payOrder',
          component: './cart/PayedOrder',
          title: '订单支付',
        },
        {
          path: '/mall/order',
          name: 'mallOrder',
          component: './order',
          title: '订单',
        },
        {
          path: '/mall/order/detail',
          name: 'mallOrderDetail',
          component: './order/detail',
          title: '订单详情',
        },
        {
          path: '/mall/address',
          name: 'mallAddress',
          component: './address',
          title: '收货地址管理',
        },
        {
          path: '/mall/goodsInfo',
          name: 'mallGoodsInfo',
          component: './goodsInfo',
          title: '商品详情页',
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
  title: '采购商城',
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  tailwindcss: {
    tailwindCssFilePath: '@/assets/less/tailwind.css',
    tailwindConfigFilePath: 'tailwind.config.js', // 默认取值 tailwindConfigFilePath || join(process.env.APP_ROOT || api.cwd, 'tailwind.config.js'),
  },
});
