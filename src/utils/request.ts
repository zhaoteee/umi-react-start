/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from 'umi-request';
import { notification } from 'antd';
import qs from 'qs';

type errorType = Response & { code: number; msg: string };

/** 异常处理程序 */
export const errorHandler = (error: { response: errorType }): errorType => {
  const { response } = error;
  if (response && response.msg !== 'success') {
    notification.error({
      message: `请求错误`,
      description: response.msg,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

/** 配置request请求时的默认参数 */
const request = extend({
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
  getResponse: true,
  // errorHandler, // 默认错误处理
  // credentials: 'include', // 默认请求是否带上cookie
});
request.interceptors.request.use((url, options) => {
  options.headers = {
    ...options.headers,
    token: localStorage.getItem('token') || '',
  };
  return {
    url,
    options: { ...options, interceptors: true },
  };
});
request.interceptors.response.use(async (response, options) => {
  if (options.responseType === 'blob') {
    return new Promise((resolve, reject) => {
      try {
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const res = await response.clone().json();
    if (res.code !== 0) {
      errorHandler({ response: res });
      reject({ response: res });
    }
    resolve(response);
  });
});
export default request;
