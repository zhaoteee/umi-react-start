import React from 'react';
import AddressCardItem from '@/pages/cart/components/AddressCardItem';
import { history } from 'umi';
import type { addressItem } from '@/hooks/useAddress';
import { Button } from 'antd';

type AddressCardType = {
  addressList: addressItem[];
  updateAddressChecked: (item: addressItem) => void;
  handleEditAddress: (id: string) => void;
  openModal: () => void;
};
const AddressCard: React.FC<AddressCardType> = (props) => {
  const { addressList, updateAddressChecked, handleEditAddress } = props;
  return (
    <div>
      <div className="flex justify-between items-center p-2.5">
        <span className="font-bold">确认收货地址</span>
        <span className="text-blue-500 hover:text-red-400 cursor-pointer" onClick={() => history.push('/mall/address')}>
          管理收货地址
        </span>
      </div>
      <div className="flex items-center overflow-x-auto p-2.5 bg-gray-100 border rounded">
        {addressList.length ? (
          addressList.map((item) => {
            return <AddressCardItem item={item} key={item.id} updateAddressChecked={updateAddressChecked} handleEditAddress={handleEditAddress} />;
          })
        ) : (
          <div>
            <span>暂无收货地址</span>
            <Button type="link" className="text-blue-500" onClick={props.openModal}>
              立即添加
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(AddressCard);
