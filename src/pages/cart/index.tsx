// import styles from './index.less';
import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import type { Dispatch } from 'umi';
import { CartModelState } from '@/models/cart';
import { Spin } from 'antd';
import CartItem from '@/pages/cart/components/CartItem';
import CartFooter from '@/pages/cart/components/CartFooter';
import CartHeader from '@/pages/cart/components/CartHeader';

type CartProps = {
  dispatch: Dispatch;
} & CartModelState;

const Cart: React.FC<CartProps> = (props) => {
  const { list, dispatch } = props;

  console.log(list);

  useEffect(() => {
    dispatch({
      type: 'cart/fetchCartInfo',
    });
  }, []);

  const [loading, setLoading] = useState(false);
  return (
    <Spin spinning={loading}>
      <div>
        <h2 className="p-2.5 border-b-2 border-red-500">购物车</h2>
        <CartHeader />
        {list.map((item) => {
          return <CartItem key={item.storeId} info={item} />;
        })}
        <CartFooter />
      </div>
    </Spin>
  );
};

export default connect(({ cart }: { cart: CartModelState }) => {
  const { list, total } = cart;
  return {
    list,
    total,
  };
})(Cart);
