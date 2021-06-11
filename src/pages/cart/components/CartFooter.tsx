import React from 'react';
import { Checkbox, Button } from 'antd';
import '../index.less';
import { toDecimal } from '@/utils/util';
import { connect } from '@@/plugin-dva/exports';
import { CartModelState } from '@/models/cart';

type CartFooterProps = {
  allSelected: boolean;
};

const CartFooter: React.FC<CartFooterProps> = (props) => {
  return (
    <div className="flex justify-between items-center bg-gray-100">
      <div className="px-5 flex-1 flex justify-between items-center">
        <div>
          <Checkbox checked={props.allSelected}>全选</Checkbox>
          <Button danger type="link">
            删除
          </Button>
        </div>
        <div className="leading-5">
          <span>合计:</span>
          <span className="ml-2.5 text-red-500 text-lg font-bold">
            {`￥${toDecimal(8000)}`}
          </span>
        </div>
      </div>
      <div className="btn-settlement bg-yellow-500">结算</div>
    </div>
  );
};

export default connect(({ cart }: { cart: CartModelState }) => {
  return {
    allSelected: cart.allSelected,
  };
})(CartFooter);
