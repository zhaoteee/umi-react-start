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
      {list.map((item, index) => {
        return <CartListItem key={item.storeId} info={item} storeIndex={index} />;
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
