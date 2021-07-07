import React from 'react';
import { Button, Modal, message } from 'antd';
import '../index.less';
import { toDecimal } from '@/utils/util';
import { connect, useDispatch } from '@@/plugin-dva/exports';
import type { CartModelState } from '@/models/cart';
import { history } from 'umi';
import type { GoodsInfo } from '@/models/cart';

type CartFooterProps = {
  totalPrice: number;
  originalList: GoodsInfo[];
};

const CartFooter: React.FC<CartFooterProps> = (props) => {
  const dispatch = useDispatch();

  const deleteAllCartItem = () => {
    const checkedCartItems = props.originalList.filter((item) => item.isChecked);
    if (checkedCartItems.length === 0) {
      message.warning('没有选中任何商品哦');
    } else {
      Modal.confirm({
        content: '确认删除这些商品吗?',
        onOk() {
          dispatch({
            type: 'cart/deleteCartItem',
            payload: {
              items: checkedCartItems,
            },
          });
        },
      });
    }
  };

  const handleSettlement = () => {
    const hasGoodsChecked = props.originalList.some((item) => item.isChecked);
    if (!hasGoodsChecked) {
      message.warning('没有选中任何商品哦');
      return;
    }
    history.push('/mall/cart/confirm');
  };

  return (
    <div className="flex justify-between items-center bg-gray-100">
      <div className="px-5 flex-1 flex justify-between items-center">
        <div>
          <Button danger type="link" onClick={deleteAllCartItem}>
            删除
          </Button>
        </div>
        <div className="leading-5">
          <span>合计:</span>
          <span className="ml-2.5 text-red-500 text-lg font-bold">{`￥${toDecimal(props.totalPrice)}`}</span>
        </div>
      </div>
      <div className="btn-settlement bg-red-500" onClick={handleSettlement}>
        结算
      </div>
    </div>
  );
};

const mapStateToProps = ({ cart }: { cart: CartModelState }) => {
  return {
    totalPrice: cart.totalPrice,
    originalList: cart.originalList,
  };
};

export default connect(mapStateToProps)(CartFooter);
