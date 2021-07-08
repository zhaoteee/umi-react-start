import React, { useEffect } from 'react';
import { PageHeader, Spin } from 'antd';
import CartFooter from '@/pages/cart/components/CartFooter';
import CartHeader from '@/pages/cart/components/CartHeader';
import { connect, useDispatch } from '@@/plugin-dva/exports';
import CartList from './components/CartList';
import type { CartItemInfo, GoodsInfo } from '@/models/cart';
import { Result, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { history } from 'umi';
import type { Loading } from '@@/plugin-dva/connect';
import type { CartModelState } from '@/models/cart';

type CartProps = {
  list: CartItemInfo[];
  originalList: GoodsInfo[];
  loading: boolean;
};
const Cart: React.FC<CartProps> = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'cart/fetchCartInfo',
    });
  }, [dispatch]);

  return (
    <Spin spinning={props.loading}>
      <div className="relative pb-25">
        <PageHeader className="p-2.5 border-b-2 border-red-500" title="购物车" />
        {props.list.length ? (
          <>
            <CartHeader />
            <CartList list={props.list} />
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

const mapStateToProps = ({ cart, loading }: { cart: CartModelState; loading: Loading }) => {
  return {
    list: cart.list,
    originalList: cart.originalList,
    loading: loading.effects['cart/fetchCartInfo'],
  };
};

export default connect(mapStateToProps)(Cart);
