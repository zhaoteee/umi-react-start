import React from 'react';
import { PageHeader, Descriptions } from 'antd';
import type { DetailInfo } from '@/models/detail';
import { toDecimal } from '@/utils/util';
import { history } from 'umi';

type DetailHeaderProp = {
  info: DetailInfo;
};
const DetailHeader: React.FC<DetailHeaderProp> = (props) => {
  const { info } = props;
  return (
    <>
      <PageHeader
        className="site-page-header"
        title={`订单号：${info.sn}`}
        ghost={false}
        onBack={() => history.goBack()}
        subTitle={<span className="text-red-500">{info.state}</span>}
        extra={<span className="text-red-500 text-2xl">{`￥${toDecimal(info.total)}`}</span>}
      />
      <Descriptions className="bg-gray-50 p-2 pb-0 mb-2.5 border-t-2 border-red-500">
        <Descriptions.Item label="下单时间">{info.date}</Descriptions.Item>
        <Descriptions.Item label="支付时间">{info.payDate}</Descriptions.Item>
        <Descriptions.Item label="完成时间">{info.completeDate}</Descriptions.Item>
        <Descriptions.Item label="收货人信息" span={3}>
          {info.address}
          {info.receiverName}
          {info.tel}
        </Descriptions.Item>
        {info.remark && (
          <Descriptions.Item label="卖家备注" span={3}>
            {info.remark}
          </Descriptions.Item>
        )}
      </Descriptions>
    </>
  );
};
export default DetailHeader;
