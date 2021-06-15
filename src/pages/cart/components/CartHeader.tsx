import React from 'react';
import { Checkbox, Col, Row } from 'antd';
import { connect, useDispatch } from '@@/plugin-dva/exports';
import type { CartModelState } from '@/models/cart';

type HeaderColumn = {
  text: string;
  col: number;
};
type CartHeaderProps = {
  headerColumns?: HeaderColumn[];
  allSelected: boolean;
};

const CartHeader: React.FC<CartHeaderProps> = (props) => {
  const headerColumns = props.headerColumns as HeaderColumn[];
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
      {headerColumns.map((item, index) => {
        return (
          <Col className={`${index === 0 ? 'text-left flex' : 'text-center'}`} key={item.text} span={item.col}>
            {index === 0 ? (
              <>
                <Checkbox checked={props.allSelected} onChange={handleAllSelected}>
                  全选
                </Checkbox>
                <span className="flex-1 text-center">{item.text}</span>
              </>
            ) : (
              item.text
            )}
          </Col>
        );
      })}
    </Row>
  );
};

CartHeader.defaultProps = {
  headerColumns: [
    { text: '商品名称', col: 12 },
    { text: '单价', col: 3 },
    { text: '数量', col: 3 },
    { text: '金额', col: 3 },
    { text: '操作', col: 3 },
  ],
};

export default connect(({ cart }: { cart: CartModelState }) => {
  return {
    allSelected: cart.allSelected,
  };
})(CartHeader);
