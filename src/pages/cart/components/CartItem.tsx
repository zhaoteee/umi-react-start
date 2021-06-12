import React, { memo } from 'react';
import { Row, Col, Checkbox, InputNumber, Button } from 'antd';
import { toDecimal } from '@/utils/util';
import type { CartItemInfo } from '@/models/cart';
import { useDispatch } from '@@/plugin-dva/exports';

type CartItemprops = {
  col?: [number, number, number, number, number];
  info: CartItemInfo;
  storeIndex: number;
};

const CartItem: React.FC<CartItemprops> = (props) => {
  const { info, col, storeIndex } = props;
  const dispatch = useDispatch();
  console.log('cartItem更新了', info);

  const handleStoreCheckChange = () => {
    dispatch({
      type: 'cart/updateCartInfo',
      payload: {
        storeIndex,
        type: 'update',
      },
    });
  };

  const handleGoodsCheckChange = (index: number) => {
    dispatch({
      type: 'cart/updateCartInfo',
      payload: {
        storeIndex,
        goodIndex: index,
        type: 'update',
      },
    });
  };

  const handleDeleteGoodsItem = (index: number) => {
    dispatch({
      type: 'cart/updateCartInfo',
      payload: {
        storeIndex,
        goodIndex: index,
        type: 'delete',
      },
    });
  };

  return (
    <div className="mb-4">
      <div className="p-2.5">
        <Checkbox checked={info.selected} onChange={handleStoreCheckChange} />
        <span className="ml-4">店铺: {info.storeName}</span>
      </div>
      <div className="border border-solid border-gray-400 divide-y divide-gray-300">
        {info.goodsList.map((item, index) => {
          return (
            <Row className="p-5" key={item.id}>
              <Col span={col![0]} className="flex">
                <Checkbox checked={item.selected} onChange={() => handleGoodsCheckChange(index)} />
                <img className="w-25 h-25 mx-2.5 object-contain flex-shrink-0" src={item.img} alt="" />
                <div className="text-gray-500">{item.name}</div>
              </Col>
              <Col className="text-center font-bold text-gray-700" span={col![1]}>
                {`￥${toDecimal(item.price)}`}
              </Col>
              <Col className="text-center" span={col![2]}>
                <InputNumber min={1} defaultValue={item.count} />
              </Col>
              <Col className="text-center font-bold text-red-500" span={col![3]}>
                {`￥${toDecimal(item.totalPrice)}`}
              </Col>
              <Col className="text-center" span={col![4]}>
                <Button type="link" danger onClick={() => handleDeleteGoodsItem(index)}>
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
CartItem.defaultProps = {
  col: [12, 3, 3, 3, 3],
};
export default memo(CartItem);
