import React from 'react';
import { Row, Col, Button } from 'antd';
import type { OrderItemInfo } from '@/models/order';
import { toDecimal } from '@/utils/util';
import { history } from 'umi';

type OrderItemProps = {
  info: OrderItemInfo;
  col?: [number, number, number, number, number];
};
const listItem: React.FC<OrderItemProps> = (props) => {
  const { col, info } = props;
  return (
    <div className="border mt-2">
      <div className="flex justify-between p-2.5 bg-gray-100">
        <span>
          {info.date} 订单号：
          <span className="text-red-500 pr-2.5 cursor-pointer" onClick={() => history.push(`/mall/order/detail?id=${info.id}`)}>
            {info.sn}
          </span>
          {info.storeName}
        </span>
        <span className="text-red-500">{info.state}</span>
      </div>
      <div className="divide-y divide-gray-100">
        {info.goodsList.map((item) => {
          return (
            <Row className="pt-5 pb-5" key={item.id}>
              <Col span={col[0]} className="flex">
                <img className="w-25 h-25 mx-2.5 object-contain flex-shrink-0 ml-5" src={item.img} alt="" />
                <div className="text-gray-500">{item.name}</div>
              </Col>
              <Col span={col[1]} className="text-center font-bold text-gray-700">
                {`￥${toDecimal(item.price)}`}
              </Col>
              <Col span={col[2]} className="text-center font-bold text-gray-700">
                {item.quantity}
              </Col>
              <Col span={col[3]} className="text-center font-bold text-gray-700">
                {`￥${toDecimal(item.total)}`}
              </Col>
              {info.hasOperate && (
                <Col span={col[3]} className="text-center">
                  <Button type="link" onClick={() => history.push(`/mall/order/detail?id=${info.id}`)}>
                    详情
                  </Button>
                </Col>
              )}
            </Row>
          );
        })}
      </div>
    </div>
  );
};
listItem.defaultProps = {
  col: [12, 3, 3, 3, 3],
};
export default listItem;
