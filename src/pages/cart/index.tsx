import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import CartFooter from '@/pages/cart/components/CartFooter';
import CartHeader from '@/pages/cart/components/CartHeader';
import { connect, useDispatch } from '@@/plugin-dva/exports';
import CartList, { mapStateToProps } from './components/CartList';
import type { CartItemInfo } from '@/models/cart';
import { Result, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { history } from 'umi';

type CartProps = {
  list: CartItemInfo[];
};
const Cart: React.FC<CartProps> = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'cart/fetchCartInfo',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [loading] = useState(false);
  return (
    <Spin spinning={loading}>
      <div>
        <h2 className="p-2.5 border-b-2 border-red-500">购物车</h2>
        {props.list.length ? (
          <>
            <CartHeader />
            <CartList />
            <CartFooter />
          </>
        ) : (
          <Result
            icon={<ShoppingCartOutlined className="text-gray-200" />}
            subTitle="购物车空空如也"
            extra={
              <Button type="primary" onClick={() => history.push('/')}>
                去购物
              </Button>
            }
          />
        )}
      </div>
    </Spin>
  );
};

export default connect(mapStateToProps)(Cart);
