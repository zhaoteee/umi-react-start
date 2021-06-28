import request from '@/utils/request';

export const getCartList = (params: any) => {
  return request('/integral/cart/list', {
    method: 'GET',
    params,
  });
};
