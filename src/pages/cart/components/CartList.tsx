import React from 'react';
import CartListItem from './CartListItem';
import type { CartItemInfo } from '@/models/cart';

type CartListProps = {
  list: CartItemInfo[];
};

const CartList: React.FC<CartListProps> = ({ list }) => {
  return (
    <div>
      {list.map((item) => {
        return <CartListItem key={item.supplierId} info={item} />;
      })}
    </div>
  );
};

export default CartList;
