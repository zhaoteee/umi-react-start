import React from 'react';
import { connect } from '@@/plugin-dva/exports';
import type { CartModelState } from '@/models/cart';
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

export const mapStateToProps = ({ cart }: { cart: CartModelState }) => {
  return {
    list: cart.list,
  };
};

export default connect(mapStateToProps)(CartList);
