import React from 'react';
import { Modal, Form, Input, Cascader } from 'antd';

type EditAddressProps = {
  isModalVisible: boolean;
  onCancel: () => void;
};

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const EditAddress: React.FC<EditAddressProps> = (props) => {
  const handleOk = () => {};

  const handleCancel = () => {
    props.onCancel();
  };

  return (
    <Modal title="编辑收货地址" visible={props.isModalVisible} onOk={handleOk} onCancel={handleCancel} width={600}>
      <Form {...layout}>
        <Form.Item label="收件人">
          <Input placeholder="请输入收件人姓名" />
        </Form.Item>
        <Form.Item label="手机">
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item label="省市区">
          <Cascader options={options} placeholder="请选择省市区" />
        </Form.Item>
        <Form.Item label="详细地址">
          <Input.TextArea placeholder="请输入详细地址" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditAddress;
