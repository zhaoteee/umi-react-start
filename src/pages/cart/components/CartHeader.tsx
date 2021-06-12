import React from 'react';
import { Checkbox, Col, Row } from 'antd';
import { connect, useDispatch } from '@@/plugin-dva/exports';
import type { CartModelState } from '@/models/cart';

type CartHeaderProps = {
  col?: [number, number, number, number, number];
  allSelected: boolean;
};

const CartHeader: React.FC<CartHeaderProps> = (props) => {
  const col = props.col as number[];
  const dispatch = useDispatch();
  // console.log(props);
  const handleAllSelected = () => {
    dispatch({
      type: 'cart/updateCartInfo',
      payload: {
        type: 'update',
      },
    });
  };
  return (
    <Row className="p-2.5 mr-2.5">
      <Col className="text-left flex" span={col[0]}>
        <Checkbox checked={props.allSelected} onChange={handleAllSelected}>
          全选
        </Checkbox>
        <span className="flex-1 text-center">商品名称</span>
      </Col>
      <Col className="text-center" span={col[1]}>
        单价
      </Col>
      <Col className="text-center" span={col[2]}>
        数量
      </Col>
      <Col className="text-center" span={col[3]}>
        金额
      </Col>
      <Col className="text-center" span={col[4]}>
        操作
      </Col>
    </Row>
  );
};

CartHeader.defaultProps = {
  col: [12, 3, 3, 3, 3],
};
export default connect(({ cart }: { cart: CartModelState }) => {
  return {
    allSelected: cart.allSelected,
  };
})(CartHeader);
