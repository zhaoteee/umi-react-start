import React from 'react';
import { Row, Col, Checkbox, InputNumber, Button } from 'antd';
import { toDecimal } from '@/utils/util';
import type { CartItemInfo } from '@/models/cart';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useDispatch } from '@@/plugin-dva/exports';

type CartItemprops = {
  col?: [number, number, number, number, number];
  info: CartItemInfo;
};

const CartItem: React.FC<CartItemprops> = (props) => {
  const { info, col } = props;
  const dispatch = useDispatch();
  console.log('更新了', info);
  type checkObj = {
    storeId: number;
    id?: number;
  };
  const handleStoreCheckChange = (e: CheckboxChangeEvent, data: checkObj): void => {
    dispatch({
      type: 'cart/updateCartInfo',
      payload: data,
    });
  };

  const handleGoodsCheckChange = (e: CheckboxChangeEvent, data: checkObj) => {
    dispatch({
      type: 'cart/updateCartInfo',
      payload: data,
    });
  };

  return (
    <div className="mb-4">
      <div className="p-2.5">
        <Checkbox checked={info.selected} onChange={(e) => handleStoreCheckChange(e, { storeId: info.storeId })} />
        <span className="ml-4">店铺: {info.storeName}</span>
      </div>
      <div className="border border-solid border-gray-400 divide-y divide-gray-300">
        {info.goodsList.map((item) => {
          return (
            <Row className="p-5" key={item.id}>
              <Col span={col![0]} className="flex">
                <Checkbox
                  checked={item.selected}
                  onChange={(e) =>
                    handleGoodsCheckChange(e, {
                      id: item.id,
                      storeId: info.storeId,
                    })
                  }
                />
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
                <Button type="link" danger>
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
export default CartItem;
