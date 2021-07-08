import React from 'react';
import OrderItem from './orderItem';
import type { OrderItemInfo } from '@/models/order';

type OrderListProps = {
  list: OrderItemInfo[];
  onHandleCancel?: () => void;
};
const listItem: React.FC<OrderListProps> = (props) => {
  const { list, onHandleCancel } = props;
  return (
    <div>
      {list.map((item) => {
        return <OrderItem key={item.id} info={item} onHandleCancel={() => onHandleCancel()} />;
      })}
    </div>
  );
};
export default listItem;
