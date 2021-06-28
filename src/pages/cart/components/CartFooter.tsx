import React from 'react';
import { Checkbox, Button, Modal } from 'antd';
import '../index.less';
import { toDecimal } from '@/utils/util';
import { connect, useDispatch } from '@@/plugin-dva/exports';
import type { CartModelState } from '@/models/cart';
import { history } from 'umi';
import type { CartItemInfo } from '@/models/cart';
import type { GoodsInfo } from '@/models/cart';

type CartFooterProps = {
  isAllChecked: boolean;
  totalPrice: number;
  list: CartItemInfo[];
};

const CartFooter: React.FC<CartFooterProps> = (props) => {
  const dispatch = useDispatch();

  const deleteAllCartItem = () => {
    Modal.confirm({
      content: '确认删除这些商品吗?',
      onOk() {
        dispatch({
          type: 'cart/deleteCartItem',
          payload: {
            items: props.list.reduce((acc: GoodsInfo[], cur) => {
              acc.push(...cur.goodsList);
              return acc;
            }, []),
          },
        });
      },
    });
  };
  // console.log(props);
  const updateAllChecked = (value: boolean) => {
    dispatch({
      type: 'cart/updateCartItemChecked',
      payload: {
        items: props.list.reduce((acc: GoodsInfo[], cur) => {
          acc.push(...cur.goodsList);
          return acc;
        }, []),
        value,
      },
    });
  };

  return (
    <div className="flex justify-between items-center bg-gray-100">
      <div className="px-5 flex-1 flex justify-between items-center">
        <div>
          <Checkbox checked={props.isAllChecked} onChange={(e) => updateAllChecked(e.target.checked)}>
            全选
          </Checkbox>
          <Button danger type="link" onClick={deleteAllCartItem}>
            删除
          </Button>
        </div>
        <div className="leading-5">
          <span>合计:</span>
          <span className="ml-2.5 text-red-500 text-lg font-bold">{`￥${toDecimal(props.totalPrice)}`}</span>
        </div>
      </div>
      <div className="btn-settlement bg-red-500" onClick={() => history.push('/mall/cart/confirm')}>
        结算
      </div>
    </div>
  );
};

const mapStateToProps = ({ cart }: { cart: CartModelState }) => {
  return {
    isAllChecked: cart.isAllChecked,
    totalPrice: cart.totalPrice,
    list: cart.list,
  };
};

export default connect(mapStateToProps)(CartFooter);
