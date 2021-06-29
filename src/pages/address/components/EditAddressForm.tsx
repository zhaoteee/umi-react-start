import React, { useEffect, useState } from 'react';
import { Form, Input, Cascader, Modal, Checkbox } from 'antd';
import useRegionList from '@/pages/address/hooks/useRegionList';
import type { addressParams } from '@/hooks/useAddress';
import { getAddressDetail } from '@/services/address';
import type { addressItem } from '@/hooks/useAddress';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const fieldNames = { label: 'name', value: 'id', children: 'children' };

type EditAddressFormType = {
  isVisible: boolean;
  id?: string;
  onCancel: () => void;
  updateAddress: (params: addressParams) => void;
  addNewAddress?: (params: addressParams) => void;
};

const EditAddressForm: React.FC<EditAddressFormType> = (props) => {
  const regionList = useRegionList();
  const [form] = Form.useForm();
  const [region, setRegion] = useState({});

  useEffect(() => {
    form.resetFields();
    if (props.id && props.id !== '') {
      getAddressDetail(props.id).then((res) => {
        const { contacts, mobile, address, isDefault, provinceId, provinceName, cityId, cityName, areaId, areaName } = res.data as addressItem;
        setRegion({
          provinceId,
          provinceName,
          cityId,
          cityName,
          areaId,
          areaName,
        });
        form.setFieldsValue({
          contacts,
          mobile,
          address,
          isDefault: isDefault ? 1 : 0,
          region: [provinceId, cityId, areaId],
        });
      });
    }
  }, [form, props.id]);

  const onRegionChange = (value: any, selectedOptions: any) => {
    const [{ id: provinceId, name: provinceName }, { id: cityId, name: cityName }, { id: areaId, name: areaName }] = selectedOptions;
    setRegion({
      provinceId,
      provinceName,
      cityId,
      cityName,
      areaId,
      areaName,
    });
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      delete values.region;
      const params = {
        ...values,
        isDefault: values.isDefault ? 1 : 0,
        ...region,
      };
      if (props.id !== '') {
        params.id = props.id;
        props.updateAddress(params);
      } else {
        props.addNewAddress?.(params);
      }
      props.onCancel();
    });
  };

  return (
    <Modal title="编辑收货地址" visible={props.isVisible} onCancel={props.onCancel} width={600} onOk={handleOk}>
      <Form {...layout} form={form}>
        <Form.Item label="收件人" name="contacts" rules={[{ required: true, message: '请输入收件人姓名' }]}>
          <Input placeholder="请输入收件人姓名" />
        </Form.Item>
        <Form.Item
          label="手机"
          name="mobile"
          rules={[
            { required: true, message: '请输入手机号' },
            {
              validator: (_, value) => (/^1[3456789]\d{9}$/.test(value) ? Promise.resolve() : Promise.reject(new Error('请输入正确的手机号码'))),
            },
          ]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item label="省市区" name="region" rules={[{ required: true, message: '请选择省市区' }]}>
          <Cascader options={regionList} fieldNames={fieldNames} onChange={onRegionChange} placeholder="请选择省市区" allowClear />
        </Form.Item>
        <Form.Item label="详细地址" name="address" rules={[{ required: true, message: '请输入详细地址' }]}>
          <Input.TextArea placeholder="请输入详细地址" />
        </Form.Item>
        <Form.Item name="isDefault" valuePropName="checked" wrapperCol={{ span: 20, offset: 4 }}>
          <Checkbox>设为默认地址</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditAddressForm;
