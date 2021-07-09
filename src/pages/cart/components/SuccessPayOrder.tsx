import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Result } from 'antd';
import { history } from 'umi';
import { getOrderDetail } from '@/services/order';
import { toDecimal } from '@/utils/util';

type SuccessPayOrderType = {
  orderId: string;
};
const SuccessPayOrder: React.FC<SuccessPayOrderType> = ({ orderId }) => {
  const [orderDetail, setOrderDetail] = useState<Record<string, string>>({});
  useEffect(() => {
    getOrderDetail(orderId).then((res) => {
      setOrderDetail(res.data);
    });
  }, [orderId]);

  return (
    <div>
      <Card bordered={false}>
        <Result status="success" title="订单提交成功" />
      </Card>
      <div className="flex">
        <Card title="订单信息" className="w-1/2 mr-2.5">
          <Descriptions column={1}>
            <Descriptions.Item label="下单店铺">{orderDetail.supplierName}</Descriptions.Item>
            <Descriptions.Item label="订单号">{orderDetail.id}</Descriptions.Item>
            <Descriptions.Item label="订单总金额">{`￥${toDecimal(Number(orderDetail.totalAmount))}`}</Descriptions.Item>
            <Descriptions.Item label="积分支付">{`${orderDetail.integral}积分抵扣￥${toDecimal(Number(orderDetail.integralAmount))}`}</Descriptions.Item>
            <Descriptions.Item label="返利支付">{`￥${toDecimal(Number(orderDetail.rebateAmount))}`}</Descriptions.Item>
            <Descriptions.Item label="剩余应付">{`￥${toDecimal(Number(orderDetail.receivableAmount))}`}</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title="收货信息" className="w-1/2">
          <Descriptions column={1}>
            <Descriptions.Item label="收货人">{orderDetail.receiverContactName}</Descriptions.Item>
            <Descriptions.Item label="手机">{orderDetail.receiverContactPhone}</Descriptions.Item>
            <Descriptions.Item label="地址">{`${orderDetail.provinceName} ${orderDetail.cityName} ${orderDetail.areaName} ${orderDetail.address}`}</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
      <div className="text-right mt-5">
        <div className="btn-submit inline-block" onClick={() => history.push(`/mall/order/detail?id=${orderId}`)}>
          查看订单
        </div>
      </div>
    </div>
  );
};

export default SuccessPayOrder;
