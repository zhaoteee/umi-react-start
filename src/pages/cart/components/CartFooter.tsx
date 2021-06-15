import React from 'react';
import { Checkbox, Button } from 'antd';
import '../index.less';
import { toDecimal } from '@/utils/util';
import { connect, useDispatch } from '@@/plugin-dva/exports';
import type { CartModelState } from '@/models/cart';
import { history } from 'umi';

type CartFooterProps = {
  allSelected: boolean;
};

const CartFooter: React.FC<CartFooterProps> = (props) => {
  console.log('footer渲染了');
  const dispatch = useDispatch();
  const handleDeleteSelectedItem = () => {
    dispatch({
      type: 'cart/updateCartInfo',
      payload: {
        type: 'delete',
      },
    });
  };
  // console.log(props);
  const handleAllSelected = () => {
    dispatch({
      type: 'cart/updateCartInfo',
      payload: {
        type: 'update',
      },
    });
  };

  return (
    <div className="flex justify-between items-center bg-gray-100">
      <div className="px-5 flex-1 flex justify-between items-center">
        <div>
          <Checkbox checked={props.allSelected} onChange={handleAllSelected}>
            全选
          </Checkbox>
          <Button danger type="link" onClick={handleDeleteSelectedItem}>
            删除
          </Button>
        </div>
        <div className="leading-5">
          <span>合计:</span>
          <span className="ml-2.5 text-red-500 text-lg font-bold">{`￥${toDecimal(8000)}`}</span>
        </div>
      </div>
      <div className="btn-settlement bg-yellow-500" onClick={() => history.push('/mall/cart/confirm')}>
        结算
      </div>
    </div>
  );
};

const mapStateToProps = ({ cart }: { cart: CartModelState }) => {
  return {
    allSelected: cart.allSelected,
  };
};

export default connect(mapStateToProps)(CartFooter);
