import request from '@/utils/request';

export const getDetail = (id: string) => {
  return request(`/integral/product/detail?id=${id}`, {
    method: 'get',
  });
};
