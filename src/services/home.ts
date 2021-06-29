import request from '@/utils/request';

export const getProductList = (params: any) => {
  return request('/integral/product/page', {
    method: 'POST',
    data: params,
  });
};
