import React, { useState } from 'react';
import { Card, Descriptions, Button, PageHeader } from 'antd';
import EditAddressForm from '@/pages/address/components/EditAddressForm';
import { CloseOutlined } from '@ant-design/icons';
import useAddress from '@/hooks/useAddress';
import useBoolean from '@/hooks/useBoolean';

const Address: React.FC = () => {
  const [isVisible, { setTrue: openModal, setFalse: closeModal }] = useBoolean(false);
  const { addressList, setDefaultAddress, deleteAddress, addNewAddress, updateAddress } = useAddress();
  const [currentId, setCurrentId] = useState('');
  const handleEditAddress = (id: string) => {
    setCurrentId(id);
    openModal();
  };
  const handleCancel = () => {
    setCurrentId('');
    closeModal();
  };
  return (
    <div>
      <PageHeader className="p-2.5 border-b-2 border-red-500" title="收货地址管理" />
      <div className="px-6 mt-2.5 text-right">
        <Button type="primary" onClick={() => openModal()}>
          新增地址
        </Button>
      </div>
      <Card bordered={false}>
        {addressList.map((item) => {
          return (
            <Card key={item.id} className={`mb-2.5 ${item.isDefault ? 'border-red-500' : ''}`}>
              <Descriptions column={1}>
                <Descriptions.Item label="收货人" className="pb-2.5">
                  {item.contacts}
                </Descriptions.Item>
                <Descriptions.Item label="手机">{item.mobile}</Descriptions.Item>
                <Descriptions.Item label="地址">{`${item.provinceName} ${item.cityName} ${item.areaName} ${item.address}`}</Descriptions.Item>
              </Descriptions>
              <div className="flex justify-between items-center">
                {item.isDefault ? <div className="text-gray-400">默认地址</div> : null}
                <div className="text-right flex-1">
                  {!item.isDefault ? (
                    <Button type="link" size={'small'} className="text-blue-500" onClick={() => setDefaultAddress(item.id)}>
                      设为默认
                    </Button>
                  ) : null}
                  <Button type="link" size={'small'} className="text-blue-500" onClick={() => handleEditAddress(item.id)}>
                    编辑
                  </Button>
                </div>
              </div>
              <CloseOutlined className="absolute top-3 right-3 cursor-pointer hover:opacity-80 text-lg text-red-500" onClick={() => deleteAddress(item.id)} />
            </Card>
          );
        })}
      </Card>
      <EditAddressForm isVisible={isVisible} id={currentId} onCancel={handleCancel} addNewAddress={addNewAddress} updateAddress={updateAddress} />
    </div>
  );
};

export default Address;
