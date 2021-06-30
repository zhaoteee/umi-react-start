import React from 'react';
import CartListItem from './CartListItem';
import type { CartItemInfo } from '@/models/cart';

type CartListProps = {
  list: CartItemInfo[];
  hasChecked?: boolean;
};

const CartList: React.FC<CartListProps> = ({ list, hasChecked = true }) => {
  return (
    <div>
      {list.map((item) => {
        return <CartListItem key={item.supplierId} info={item} hasChecked={hasChecked} />;
      })}
    </div>
  );
};

export default CartList;
