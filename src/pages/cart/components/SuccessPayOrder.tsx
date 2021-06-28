import React from 'react';
import { Card, Descriptions, Result } from 'antd';
import { history } from 'umi';

const SuccessPayOrder: React.FC = () => {
  return (
    <div>
      <Card bordered={false}>
        <Result status="success" title="订单提交成功" />
      </Card>
      <div className="flex">
        <Card title="订单信息" className="w-1/2 mr-2.5">
          <Descriptions column={1}>
            <Descriptions.Item label="下单店铺">XXXX品牌方</Descriptions.Item>
            <Descriptions.Item label="订单号">5646464654</Descriptions.Item>
            <Descriptions.Item label="订单总金额">￥600.00</Descriptions.Item>
            <Descriptions.Item label="积分支付">1200元抵扣￥100.00</Descriptions.Item>
            <Descriptions.Item label="返利支付">0</Descriptions.Item>
            <Descriptions.Item label="剩余应付">500</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title="收货信息" className="w-1/2">
          <Descriptions column={1}>
            <Descriptions.Item label="收货人">张朝阳</Descriptions.Item>
            <Descriptions.Item label="手机">15323232323</Descriptions.Item>
            <Descriptions.Item label="地址"> 浙江省 杭州市 江干区 下沙一号大街一号朝阳轮胎仓库1号门</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
      <div className="text-right mt-5">
        <div className="btn-submit inline-block" onClick={() => history.push('/mall/order')}>
          查看订单
        </div>
      </div>
    </div>
  );
};

export default SuccessPayOrder;
