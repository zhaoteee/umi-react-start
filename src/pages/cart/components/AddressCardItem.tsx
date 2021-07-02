import React from 'react';
import { Button } from 'antd';
import type { addressItem } from '@/hooks/useAddress';

type AddressCardItemProps = {
  item: addressItem;
  updateAddressChecked: (item: addressItem) => void;
  handleEditAddress: (id: string) => void;
};

const AddressCardItem: React.FC<AddressCardItemProps> = (props) => {
  const { handleEditAddress } = props;
  const { item, updateAddressChecked } = props;
  return (
    <div
      className={`w-80 h-32 p-2.5 mr-2.5 flex flex-col justify-between flex-shrink-0 border rounded cursor-pointer bg-white ${item.isChecked ? 'border-red-500' : ''}`}
      onClick={() => updateAddressChecked(item)}
    >
      <div className="font-bold">
        <span className="mr-2.5">{item.contacts}</span>
        <span>{item.mobile}</span>
      </div>
      <div className="my-2.5 flex-1 e2">{`${item.provinceName} ${item.cityName} ${item.areaName} ${item.address}`}</div>
      <div className="flex justify-between items-center">
        <Button className="text-blue-500 p-0" type="link" size="small" onClick={() => handleEditAddress(item.id)}>
          编辑
        </Button>
        {item.isDefault ? <span className="text-gray-400">默认地址</span> : null}
      </div>
    </div>
  );
};

export default React.memo(AddressCardItem);
