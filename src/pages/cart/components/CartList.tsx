import React from 'react';
import CartListItem from './CartListItem';
import type { CartItemInfo } from '@/models/cart';

type CartListProps = {
  list: CartItemInfo[];
  canEdit?: boolean;
  col?: number[];
};

const CartList: React.FC<CartListProps> = ({ list, canEdit = true, col }) => {
  return (
    <div className="mb-25">
      {list.map((item) => {
        return <CartListItem key={item.supplierId} info={item} canEdit={canEdit} col={col} />;
      })}
    </div>
  );
};

export default React.memo(CartList);
