import React from 'react';
import { Row, Col, Checkbox, InputNumber, Button, Modal } from 'antd';
import { preFixPath, toDecimal } from '@/utils/util';
import type { CartItemInfo } from '@/models/cart';
import { useDispatch } from '@@/plugin-dva/exports';
import type { GoodsInfo } from '@/models/cart';
import { debounce } from 'lodash';

type CartItemprops = {
  col?: number[];
  info: CartItemInfo;
  canEdit?: boolean;
};

const CartListItem: React.FC<CartItemprops> = (props) => {
  const { info, col, canEdit } = props;
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

  const updateCartItemQuantity = debounce((item: GoodsInfo, quantity: number) => {
    const farmatQuantity = !Number.isNaN(quantity) ? String(quantity).replace(/^(0+)|[^\d]/g, '') : '';
    if (item.quantity === Number(farmatQuantity)) return;
    dispatch({
      type: 'cart/updateCartItemQuantity',
      payload: {
        item,
        quantity: farmatQuantity,
      },
    });
  }, 500);

  const limitNumber = (value: number | undefined) => {
    return !Number.isNaN(value) ? String(value).replace(/^(0+)|[^\d]/g, '') : '';
  };

  return (
    <div className="mb-4">
      <div className="p-2.5">
        {canEdit && <Checkbox checked={info.isChecked} onChange={(e) => updateStoreChecked(info, e.target.checked)} />}
        <span className="ml-4">店铺: {info.supplierName}</span>
      </div>
      <div className="mx-2.5 border border-solid border-gray-400 divide-y divide-gray-300">
        {info.goodsList.map((item) => {
          return (
            <Row className="p-5 text-sm" key={item.id}>
              <Col span={col![0]} className="flex">
                {canEdit && <Checkbox checked={item.isChecked} onChange={(e) => updateCartItemChecked(item, e.target.checked)} />}
                <img className="w-25 h-25 mx-2.5 object-contain flex-shrink-0" src={item.image.indexOf('http') < 0 ? `${preFixPath}${item.image}` : item.image} alt={item.title} />
                <div className="text-gray-500">{item.title}</div>
              </Col>
              <Col className="pl-8 font-bold text-gray-700" span={col![1]}>
                {`￥${toDecimal(item.invoicePrice)}`}
              </Col>
              <Col className="text-center" span={col![2]}>
                {canEdit ? <InputNumber min={1} formatter={limitNumber} defaultValue={item.quantity} onChange={(quantity) => updateCartItemQuantity(item, quantity)} /> : <span>{item.quantity}</span>}
              </Col>
              <Col className="pl-8 font-bold text-red-500" span={col![3]}>
                {`￥${toDecimal(item.invoicePrice * item.quantity)}`}
              </Col>
              {canEdit && (
                <Col className="text-center" span={col![4]}>
                  <Button type="link" className="text-gray-600 hover:opacity-70 p-0 -mt-2" onClick={() => deleteCartItem(item)}>
                    删除
                  </Button>
                </Col>
              )}
            </Row>
          );
        })}
      </div>
    </div>
  );
};
CartListItem.defaultProps = {
  col: [12, 3, 3, 3, 3],
  canEdit: true,
};
export default React.memo(CartListItem);
