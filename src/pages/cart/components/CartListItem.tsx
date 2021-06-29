import React, { memo } from 'react';
import { Row, Col, Checkbox, InputNumber, Button, Modal } from 'antd';
import { toDecimal } from '@/utils/util';
import type { CartItemInfo } from '@/models/cart';
import { useDispatch } from '@@/plugin-dva/exports';
import type { GoodsInfo } from '@/models/cart';

type CartItemprops = {
  col?: [number, number, number, number, number];
  info: CartItemInfo;
};

const CartListItem: React.FC<CartItemprops> = (props) => {
  const { info, col } = props;
  const dispatch = useDispatch();

  const updateStoreChecked = ({ goodsList }: CartItemInfo, value: boolean) => {
    dispatch({
      type: 'cart/updateCartItemChecked',
      payload: {
        items: goodsList,
        value,
      },
    });
  };

  const updateCartItemChecked = (item: GoodsInfo, value: boolean) => {
    dispatch({
      type: 'cart/updateCartItemChecked',
      payload: {
        items: [item],
        value,
      },
    });
  };

  const deleteCartItem = (item: GoodsInfo) => {
    Modal.confirm({
      content: '确认删除此商品吗?',
      onOk() {
        dispatch({
          type: 'cart/deleteCartItem',
          payload: {
            items: [item],
          },
        });
      },
    });
  };

  const updateCartItemQuantity = (item: GoodsInfo, quantity: number) => {
    dispatch({
      type: 'cart/updateCartItemQuantity',
      payload: {
        item,
        quantity,
      },
    });
  };

  return (
    <div className="mb-4">
      <div className="p-2.5">
        <Checkbox checked={info.isChecked} onChange={(e) => updateStoreChecked(info, e.target.checked)} />
        <span className="ml-4">店铺: {info.supplierName}</span>
      </div>
      <div className="mx-2.5 border border-solid border-gray-400 divide-y divide-gray-300">
        {info.goodsList.map((item) => {
          return (
            <Row className="p-5" key={item.id}>
              <Col span={col![0]} className="flex">
                <Checkbox checked={item.isChecked} onChange={(e) => updateCartItemChecked(item, e.target.checked)} />
                <img className="w-25 h-25 mx-2.5 object-contain flex-shrink-0" src={item.image} alt={item.title} />
                <div className="text-gray-500">{item.title}</div>
              </Col>
              <Col className="text-center font-bold text-gray-700" span={col![1]}>
                {`￥${toDecimal(item.invoicePrice)}`}
              </Col>
              <Col className="text-center" span={col![2]}>
                <InputNumber min={1} defaultValue={item.quantity} onChange={(quantity) => updateCartItemQuantity(item, quantity)} />
              </Col>
              <Col className="text-center font-bold text-red-500" span={col![3]}>
                {`￥${toDecimal(item.invoicePrice * item.quantity)}`}
              </Col>
              <Col className="text-center" span={col![4]}>
                <Button type="link" danger onClick={() => deleteCartItem(item)}>
                  删除
                </Button>
              </Col>
            </Row>
          );
        })}
      </div>
    </div>
  );
};
CartListItem.defaultProps = {
  col: [12, 3, 3, 3, 3],
};
export default memo(CartListItem);
