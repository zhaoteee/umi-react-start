import React from 'react';
import { Col, Row } from 'antd';

type HeaderColumn = {
  text: string;
  col: number;
};
type CartHeaderProps = {
  headerColumns?: HeaderColumn[];
};

const CartHeader: React.FC<CartHeaderProps> = (props) => {
  const headerColumns = props.headerColumns as HeaderColumn[];
  return (
    <Row className="p-2.5 mr-5">
      {headerColumns.map((item, index) => {
        return (
          <Col className={`${index === 0 ? 'text-left pl-12' : 'text-center'}`} key={item.text} span={item.col}>
            {item.text}
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
};

export default CartHeader;
