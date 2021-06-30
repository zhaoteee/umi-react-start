/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from 'umi-request';
import { notification } from 'antd';
import { history } from 'umi';
import qs from 'qs';

type errorType = Response & { code: number; message: string };

const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',

  100000: '系统繁忙，请稍后再试',
  110004: '权限不足',
  110000: '认证异常',
  110001: 'Token已过期',
  110002: 'Token不存在或已失效',
  110005: '未登录或者登录已失效',
  110009: '会话无效',
  110010: '凭证错误',
  110013: '凭证过期',
  155446: '账号已经在其他设备登录，需重新登录',
};
/**  110004: '权限不足'（某个接口出现暂时不跳转登录页面）
      110000: '认证异常', 110001: 'Token已过期', 110002: 'Token不存在或已失效',
      , 110005: '未登录或者登录已失效', 110009: '会话无效',
      110010: '凭证错误', 110013: '凭证过期', 155446: '账号已经在其他设备登录，需重新登录'
    */
export const tokenValidCodeList = [110000, 110001, 110002, 110005, 110009, 110010, 110013, 155446];
/** 异常处理程序 */
export const errorHandler = (error: { response: errorType }): errorType => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (response && response.code) {
    const errorText = codeMessage[response.code] || response.message;

    notification.warn({
      message: errorText,
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
  prefix: '/api/integral-mall',
  // errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});
request.interceptors.request.use((url, options) => {
  options.headers = {
    ...options.headers,
    Authorization:
      localStorage.getItem('token') ||
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzA0ODg3Mjg1MSIsInRpbWUiOjE2MjUwMTM5OTE0MTEsImlzcyI6InNlY3VyaXR5IiwiaWF0IjoxNjI1MDEzOTkxLCJleHAiOjE2MjUxMzM5OTF9.M_0mYSUFAfveb6d5bNZE6BSHkAHeorA_Hl3nqurDfnjbLN6-_goMZ_EHb4CR-TmvUkwmLBVFMWbWy7_B-LIiPw',
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
        console.log(response.clone());
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const res = await response.clone().json();
    if (tokenValidCodeList.find((c) => c === res.code)) {
      // 身份认证失败需重新登录
      reject({ response: res });
      errorHandler({ response: res });
      history.push('/user/login');
    } else if (res.code !== 200) {
      errorHandler({ response: res });
      reject({ response: res });
    }
    resolve(res);
  });
});
export default request;
