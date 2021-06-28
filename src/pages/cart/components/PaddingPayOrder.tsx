import React from 'react';
import { Card, Radio, Space, Descriptions } from 'antd';
import { toDecimal } from '@/utils/util';

const PaddingPayOrder: React.FC = () => {
  return (
    <div>
      <Card bordered={false}>
        <div className="flex items-center">
          <div className="mr-5">
            <span>应付金额:</span>
            <span className="font-bold text-2xl text-red-500">{`￥${toDecimal(800)}`}</span>
          </div>
          <div>
            <span>下单店铺:</span>
            <span>小胎店铺</span>
          </div>
        </div>
      </Card>
      <Card bordered={false}>
        <Radio.Group value={1}>
          <Space direction="vertical">
            <Radio value={1}>可用5000积分抵扣￥500.00（积分余额5000）</Radio>
            <Radio value={2}>返利可抵￥60.00 （返利余额￥100.00）</Radio>
          </Space>
        </Radio.Group>
        <div className="py-5">
          <span>剩余应付</span>
          <span>{`￥${toDecimal(800)}`}</span>
        </div>
        <Card>
          <Descriptions column={1}>
            <Descriptions.Item label="开户名称">杭州中策车空间汽车服务有限公司</Descriptions.Item>
            <Descriptions.Item label="开户银行">XX银行XX支行</Descriptions.Item>
            <Descriptions.Item label="帐号">4546 464 46454 56</Descriptions.Item>
            <Descriptions.Item label="说明">积分或返利支付不足时，也可点击确认支付，并将剩余金额通过其他方式汇入以上帐户。</Descriptions.Item>
          </Descriptions>
        </Card>
      </Card>
      <div className="text-right px-5">
        <div className="btn-submit inline-block">确认</div>
      </div>
    </div>
  );
};

export default PaddingPayOrder;
