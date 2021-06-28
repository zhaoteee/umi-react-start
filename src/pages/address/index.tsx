import React, { useState } from 'react';
import { testAddressInfo } from '@/pages/cart/components/AddressCard';
import { Card, Descriptions, Button } from 'antd';
import EditAddress from '@/pages/address/components/EditAddress';
import { CloseOutlined } from '@ant-design/icons';

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
                <Descriptions.Item label="收货人" className="pb-2.5">
                  {item.name}
                </Descriptions.Item>
                <Descriptions.Item label="手机">{item.phone}</Descriptions.Item>
                <Descriptions.Item label="地址">{item.address}</Descriptions.Item>
              </Descriptions>
              <div className="text-right">
                {!item.default ? (
                  <Button type="link" size={'small'} className="text-blue-500">
                    设为默认
                  </Button>
                ) : null}
                <Button type="link" size={'small'} className="text-blue-500" onClick={openModal}>
                  编辑
                </Button>
              </div>
              <CloseOutlined className="absolute top-3 right-3 cursor-pointer hover:opacity-80 text-lg text-red-500" />
            </Card>
          );
        })}
      </Card>
      <EditAddress isModalVisible={isModalVisible} onCancel={closeModal} />
    </div>
  );
};

export default Address;
