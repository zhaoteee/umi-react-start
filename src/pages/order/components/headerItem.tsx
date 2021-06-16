import React from 'react';
import { Row, Col } from 'antd';

type headerColumn = {
  text: string;
  col: number;
};
type headerProps = {
  headerColumns?: headerColumn[];
};
const header: React.FC<headerProps> = (props) => {
  const { headerColumns } = props;
  return (
    <Row>
      {headerColumns.map((item) => {
        return (
          <Col span={item.col} key={item.text} className="text-center">
            <span className="flex-1 text-center">{item.text}</span>
          </Col>
        );
      })}
    </Row>
  );
};
header.defaultProps = {
  headerColumns: [
    { text: '商品', col: 12 },
    { text: '售价', col: 3 },
    { text: '数量', col: 3 },
    { text: '金额', col: 3 },
    { text: '操作', col: 3 },
  ],
};
export default header;
