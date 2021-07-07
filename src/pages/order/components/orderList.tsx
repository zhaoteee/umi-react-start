import React from 'react';
import OrderItem from './orderItem';
import type { OrderItemInfo } from '@/models/order';

type OrderListProps = {
  list: OrderItemInfo[];
};
const listItem: React.FC<OrderListProps> = (props) => {
  const { list } = props;
  return (
    <div>
      {list.map((item) => {
        return <OrderItem key={item.id} info={item} />;
      })}
    </div>
  );
};
export default listItem;
