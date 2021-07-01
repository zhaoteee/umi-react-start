import request from '@/utils/request';

export const addOrder = (params: { addressId: string; cartIds: number[]; consumerRemark?: string }) => {
  return request('/integral/order/add', {
    method: 'POST',
    data: params,
  });
};
