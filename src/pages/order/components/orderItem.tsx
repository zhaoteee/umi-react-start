import React from 'react';
import { Row, Col, Button } from 'antd';
import type { OrderItemInfo } from '@/models/order';
import { toDecimal } from '@/utils/util';
import { history, Link } from 'umi';
import DetailFooter from './detailFooterItem';
import VoucherModal from './voucherModal';

type OrderItemProps = {
  info: OrderItemInfo;
  col?: [number, number, number, number, number];
  onHandleCancel?: () => void;
};
const ListItem: React.FC<OrderItemProps> = (props) => {
  const { col, info, onHandleCancel } = props;
  const [isShow, setIsShow] = React.useState(false);
  const onHandleOK = () => {
    setIsShow(false);
    if (onHandleCancel) onHandleCancel();
  };
  return (
    <div className="border mt-2">
      <Row className="bg-gray-100 pt-2 pb-2">
        <Col span="18" className="pl-2">
          <span className="pr-5">下单时间：{info.createDate}</span>订单号：
          <span className="pr-5 cursor-pointer" onClick={() => info.hasOperate && history.push(`/mall/order/detail?id=${info.id}`)}>
            {info.sn}
          </span>
          <span className="pr-5">品牌商名称：{info.supplierName}</span>
          {info.hasOperate && <span className="text-red-500">{info.statusText}</span>}
        </Col>
        <Col span="6" className="text-right pr-2.5">
          <span>
            总金额：<span className="text-red-500">{`￥${toDecimal(info.receivableAmount)}`}</span>（含运费：<span className="text-red-500">{`￥${toDecimal(info.freightFee)}`}）</span>
          </span>
          {info.hasOperate && (info.orderStatus === 'PART_PAY' || info.orderStatus === 'WAIT_PAY') && (
            <DetailFooter info={info} onHandleCancel={() => onHandleCancel && onHandleCancel()} onHandleShow={() => setIsShow(true)} />
          )}
          {!info.hasOperate && <span className="text-red-500">{info.statusText}</span>}
        </Col>
      </Row>
      <div className="divide-y divide-gray-100">
        {info.integralOrderItemDTOs &&
          info.integralOrderItemDTOs.map((item) => {
            return (
              <Row className="pt-5 pb-5" key={item.id}>
                <Col span={col![0]} className="flex">
                  <img className="w-25 h-25 mx-2.5 object-cover flex-shrink-0 ml-5" src={`${item.images}_100w`} alt="" />
                  <div className="text-gray-500">{item.title}</div>
                </Col>
                <Col span={col![1]} className="text-left font-bold text-gray-700">
                  {`￥${toDecimal(item.price)}`}
                </Col>
                <Col span={col![2]} className="text-left font-bold text-gray-700">
                  {item.quantity}
                </Col>
                <Col span={col![3]} className="text-left font-bold text-gray-700">
                  {`￥${toDecimal(item.totalAmount)}`}
                </Col>
                {info.hasOperate && (
                  <Col span={col![3]} className="text-center">
                    <Link to={`/mall/order/detail?id=${info.id}`} target="_blank">
                      <Button type="link">详情</Button>
                    </Link>
                  </Col>
                )}
              </Row>
            );
          })}
      </div>
      {isShow && <VoucherModal isShow={isShow} id={info.id} onHandleHide={() => setIsShow(false)} onHandleOK={() => onHandleOK()} />}
    </div>
  );
};
ListItem.defaultProps = {
  col: [12, 3, 3, 3, 3],
};
export default ListItem;
