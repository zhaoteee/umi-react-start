import React from 'react';
import AddressCardItem from '@/pages/cart/components/AddressCardItem';
import { history } from 'umi';

export const testAddressInfo = [
  {
    id: 0,
    name: '张朝阳',
    phone: '13812345687',
    address: '浙江省 杭州市 江干区 下沙一号大街一号朝阳轮胎仓库1号门',
    default: true,
  },
  {
    id: 1,
    name: '张朝阳',
    phone: '13812345687',
    address: '浙江省 杭州市 江干区 下沙一号大街一号朝阳轮胎仓库1号门',
  },
  {
    id: 2,
    name: '张朝阳',
    phone: '13812345687',
    address: '浙江省 杭州市 江干区 下沙一号大街一号朝阳轮胎仓库1号门',
  },
  {
    id: 3,
    name: '张朝阳',
    phone: '13812345687',
    address: '浙江省 杭州市 江干区 下沙一号大街一号朝阳轮胎仓库1号门',
  },
  {
    id: 4,
    name: '张朝阳',
    phone: '13812345687',
    address: '浙江省 杭州市 江干区 下沙一号大街一号朝阳轮胎仓库1号门',
  },
];
const AddressCard: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center p-2.5">
        <span className="font-bold">确认收货地址</span>
        <span className="text-blue-500 hover:text-red-400 cursor-pointer" onClick={() => history.push('/mall/address')}>
          管理收货地址
        </span>
      </div>
      <div className="flex items-center overflow-x-auto p-2.5 bg-gray-100 border rounded">
        {testAddressInfo.map((item) => {
          return <AddressCardItem item={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};

export default AddressCard;
