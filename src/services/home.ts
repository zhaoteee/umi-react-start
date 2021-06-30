import request from '@/utils/request';

export const getProductList = (params: any) => {
  return request('/integral/product/page', {
    method: 'POST',
    data: params,
  });
};

export const getProductAgg = () => {
  return request('/integral/product/agg', {
    method: 'get',
  });
};
