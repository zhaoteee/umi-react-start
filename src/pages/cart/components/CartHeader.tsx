import React from 'react';
import { Checkbox, Col, Row } from 'antd';
import { connect, useDispatch } from '@@/plugin-dva/exports';
import type { CartModelState, GoodsInfo } from '@/models/cart';

type HeaderColumn = {
  text: string;
  col: number;
};
type CartHeaderProps = {
  headerColumns?: HeaderColumn[];
  originalList: GoodsInfo[];
  isAllChecked: boolean;
  hasAllChecked?: boolean;
};

const CartHeader: React.FC<CartHeaderProps> = (props) => {
  const { originalList, isAllChecked, hasAllChecked } = props;
  const headerColumns = props.headerColumns as HeaderColumn[];
  const dispatch = useDispatch();
  const updateAllChecked = (value: boolean) => {
    dispatch({
      type: 'cart/updateCartItemChecked',
      payload: {
        items: originalList,
        value,
      },
    });
  };

  return (
    <Row className="p-2.5 mr-5">
      {headerColumns.map((item, index) => {
        return (
          <Col className={`${index === 0 ? 'text-left flex' : 'text-center'}`} key={item.text} span={item.col}>
            {index === 0 ? (
              <>
                {hasAllChecked && (
                  <Checkbox checked={isAllChecked} onChange={(e) => updateAllChecked(e.target.checked)}>
                    全选
                  </Checkbox>
                )}
                <span className="flex-1 text-left pl-25">{item.text}</span>
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
    { text: '商品信息', col: 12 },
    { text: '单价', col: 3 },
    { text: '数量', col: 3 },
    { text: '金额', col: 3 },
    { text: '操作', col: 3 },
  ],
  hasAllChecked: true,
};

const mapStateToProps = ({ cart }: { cart: CartModelState }) => {
  return {
    originalList: cart.originalList,
    isAllChecked: cart.isAllChecked,
  };
};

export default connect(mapStateToProps)(CartHeader);
