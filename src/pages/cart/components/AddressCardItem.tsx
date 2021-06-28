import React, { useContext } from 'react';
import { Store } from '@/pages/cart/ConfirmOrder';
import type { IStore } from '@/pages/cart/ConfirmOrder';

type AddressCardItemProps = {
  item: {
    id: number;
    name: string;
    phone: string;
    address: string;
    default?: boolean;
  };
};

const AddressCardItem: React.FC<AddressCardItemProps> = (props) => {
  const { handleEditAddress } = useContext(Store) as IStore;
  const { item } = props;
  return (
    <div className={`w-80 p-2.5 mr-2.5 flex-shrink-0 border rounded cursor-pointer bg-white ${item.default ? 'border-red-500' : ''}`}>
      <div className="font-bold">
        <span className="mr-2.5">{item.name}</span>
        <span>{item.phone}</span>
      </div>
      <div className="py-2.5">{item.address}</div>
      <div className="text-blue-500" onClick={() => handleEditAddress()}>
        编辑
      </div>
    </div>
  );
};

export default AddressCardItem;
