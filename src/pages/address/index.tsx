import React, { useState } from 'react';
import { testAddressInfo } from '@/pages/cart/components/AddressCard';
import { Card, Descriptions, Button } from 'antd';
import EditAddress from '@/pages/address/components/EditAddress';

const Address: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <h2 className="p-2.5 border-b-2 border-red-500">收货地址管理</h2>
      <div className="px-6 text-right">
        <Button type="primary" onClick={() => openModal()}>
          新增地址
        </Button>
      </div>
      <Card bordered={false}>
        {testAddressInfo.map((item) => {
          return (
            <Card key={item.id} className="mb-2.5">
              <Descriptions column={1}>
                <Descriptions.Item label="收货人">{item.name}</Descriptions.Item>
                <Descriptions.Item label="手机">{item.phone}</Descriptions.Item>
                <Descriptions.Item label="地址">{item.address}</Descriptions.Item>
              </Descriptions>
              <div className="text-right">
                <Button type="link" danger size={'small'}>
                  删除
                </Button>
                <Button type="link" size={'small'} className="text-blue-500" onClick={openModal}>
                  编辑
                </Button>
              </div>
            </Card>
          );
        })}
      </Card>
      <EditAddress isModalVisible={isModalVisible} closeModal={closeModal} />
    </div>
  );
};

export default Address;
