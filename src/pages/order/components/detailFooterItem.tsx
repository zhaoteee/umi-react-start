import React from 'react';
import { Button, Popconfirm, message } from 'antd';
import type { DetailInfo } from '@/models/detail';
import { cancelOrder } from '@/services/order';
import { history } from 'umi';

type DetailFooterProp = {
  info: DetailInfo;
  onHandleCancel: () => void;
  onHandleShow: () => void;
};
const DetailHeader: React.FC<DetailFooterProp> = (props) => {
  const { info, onHandleCancel, onHandleShow } = props;
  const handleCancelOrder = (id: string) => {
    cancelOrder(id).then(() => {
      onHandleCancel();
      message.success('取消成功');
    });
  };
  return (
    <div className="text-right mt-5 mb-5">
      <Popconfirm title="确认取消订单吗?" onConfirm={() => handleCancelOrder(info.id)} okText="是" cancelText="否" key="4">
        <Button className="mr-2.5">取消订单</Button>
      </Popconfirm>
      {info.orderStatus === 'PART_PAY' && (
        <Button key="2" type="primary" onClick={() => onHandleShow()}>
          线下打款
        </Button>
      )}
      {info.orderStatus === 'WAIT_PAY' && (
        <Button key="3" type="primary" onClick={() => history.push(`/mall/cart/paying?orderId=${detail.id}`)}>
          支付
        </Button>
      )}
    </div>
  );
};
export default DetailHeader;
