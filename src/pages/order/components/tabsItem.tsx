import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

type statusColumn = {
  text: string;
  key: string;
};
type TabsProps = {
  statusColumns?: statusColumn[];
  onConfirmChange: (status: string) => void;
};
const tabs: React.FC<TabsProps> = (props) => {
  const { statusColumns, onConfirmChange } = props;
  const onChange = (val: string) => {
    onConfirmChange(val);
  };
  return (
    <Tabs defaultActiveKey="0" onChange={onChange} size="large">
      {statusColumns &&
        statusColumns.map((item) => {
          return <TabPane tab={item.text} key={item.key}></TabPane>;
        })}
    </Tabs>
  );
};
tabs.defaultProps = {
  statusColumns: [
    { text: '全部订单', key: '' },
    { text: '待付款', key: '1,2' },
    { text: '待发货', key: '3,4,7' },
    { text: '部分发货', key: '5' },
    { text: '已发货', key: '6' },
    { text: '已关闭', key: '10' },
  ],
};
export default tabs;
