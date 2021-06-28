import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

type statusColumn = {
  text: string;
  key: number;
};
type TabsProps = {
  statusColumns?: statusColumn[];
  onConfirmChange: (status: number) => void;
};
const tabs: React.FC<TabsProps> = (props) => {
  const { statusColumns, onConfirmChange } = props;
  const onChange = (val: number) => {
    onConfirmChange(val);
  };
  return (
    <Tabs defaultActiveKey="1" onChange={onChange}>
      {statusColumns.map((item) => {
        return <TabPane tab={item.text} key={item.key}></TabPane>;
      })}
    </Tabs>
  );
};
tabs.defaultProps = {
  statusColumns: [
    { text: '全部订单', key: 1 },
    { text: '待付款', key: 2 },
    { text: '待发货', key: 3 },
    { text: '部分发货', key: 4 },
    { text: '待收货', key: 5 },
    { text: '已关闭', key: 6 },
    { text: '已完成', key: 7 },
  ],
};
export default tabs;
