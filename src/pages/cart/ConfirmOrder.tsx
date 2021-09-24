import React, { useCallback, useEffect, useState } from 'react';
import './index.less';
import CartHeader from '@/pages/cart/components/CartHeader';
import CartList from '@/pages/cart/components/CartList';
import { Spin, Input, PageHeader, notification } from 'antd';
import AddressCard from '@/pages/cart/components/AddressCard';
import { toDecimal } from '@/utils/util';
import type { Location } from 'umi';
import { history, useLocation } from 'umi';
import EditAddressForm from '@/pages/address/components/EditAddressForm';
import useAddress from '@/hooks/useAddress';
import useBoolean from '@/hooks/useBoolean';
import type { CartModelState, GoodsInfo, CartItemInfo } from '@/models/cart';
import { connect, useDispatch } from '@@/plugin-dva/exports';
import { handleCartInfo } from '@/models/cart';
import { addOrder } from '@/services/order';
import type { Loading } from '@@/plugin-dva/connect';
import { getDetail } from '@/services/info';
import type { FreightType, FreightTemplate } from '@/pages/cart/components/ShippingList';
import ShippingList from '@/pages/cart/components/ShippingList';
import { getFreightList } from '@/services/cart';

type ConfirmOrderProps = {
  originalList: GoodsInfo[];
  totalPrice: number;
  loading: boolean;
};
const headerColumns = [
  { text: '商品信息', col: 12 },
  { text: '单价', col: 4 },
  { text: '数量', col: 4 },
  { text: '金额', col: 4 },
];
const col = [12, 4, 4, 4];
const ConfirmOrder: React.FC<ConfirmOrderProps> = (props) => {
  const { originalList, loading } = props;
  const location: Location<{ query: { id: string; quantity: string } }> = useLocation();
  const productId = location.query?.id as string;
  const quantity = location.query?.quantity as string;
  const dispatch = useDispatch();
  const { TextArea } = Input;
  const [isVisible, { setTrue: openModal, setFalse: closeModal }] = useBoolean(false);
  const [editingAddressId, setEditingAddressId] = useState('');
  const [consumerRemark, setConsumerRemark] = useState('');
  const { addressList, updateAddressChecked, updateAddress, selectedAddressId, addNewAddress } = useAddress();
  const [selectedList, setSelectedList] = useState<CartItemInfo[]>([]);
  const [detailLoading, setDetailLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [freightList, setFreightList] = useState<FreightType>({
    freightName: '',
    freightTemplates: [],
  });
  const [selectedTem, setSelectedTem] = useState<FreightTemplate | null>(null);

  const handleEditAddress = useCallback(
    (id: string) => {
      setEditingAddressId(id);
      openModal();
    },
    [openModal],
  );

  useEffect(() => {
    if (!productId) {
      setTotalPrice(props.totalPrice);
      setSelectedList(handleCartInfo(originalList.filter((item) => item.isChecked)));
    }
  }, [originalList, productId, props.totalPrice]);

  useEffect(() => {
    const params = !productId ? { cartIds: originalList.filter((item) => item.isChecked).map((item) => item.id) } : { productId, quantity };
    if (params.cartIds?.length || params.productId) {
      getFreightList(params).then((res) => {
        setFreightList(res.data);
      });
    }
  }, [originalList, productId, quantity]);

  useEffect(() => {
    if (!productId) {
      dispatch({
        type: 'cart/fetchCartInfo',
      });
    } else {
      setDetailLoading(false);
      getDetail(productId)
        .then((res) => {
          const item = {
            ...res.data,
            image: res.data.productInfoExtDTO.productImages[0].resource,
            quantity,
            supplierName: res.data.supplierShopName,
          };
          setSelectedList(handleCartInfo([item]));
          setTotalPrice(res.data.invoicePrice * Number(quantity));
        })
        .finally(() => {
          setDetailLoading(false);
        });
    }
  }, [dispatch, productId, quantity]);

  const handleSubmit = () => {
    if (!selectedAddressId) {
      notification.warn({
        message: '请选择收货地址',
      });
      return;
    }
    const params = !productId
      ? {
          addressId: selectedAddressId,
          cartIds: originalList.filter((item) => item.isChecked).map((item) => item.id),
          consumerRemark,
          freightTemplateItemId: selectedTem?.freightTemplateItem.freightTemplateId,
        }
      : {
          addressId: selectedAddressId,
          productId,
          quantity,
          consumerRemark,
          freightTemplateItemId: selectedTem?.freightTemplateItem.freightTemplateId,
        };
    addOrder(params).then((res: any) => {
      if (res.success) {
        history.replace(`/mall/cart/paying?orderId=${res.data}`);
      }
    });
  };
  return (
    <Spin spinning={productId ? detailLoading : loading}>
      <div>
        <PageHeader className="p-2.5 border-b-2 border-red-500" title="确认订单" onBack={() => history.goBack()} />
        <AddressCard openModal={openModal} addressList={addressList} updateAddressChecked={updateAddressChecked} handleEditAddress={handleEditAddress} />
        <div className="p-2.5 font-bold">确认订单信息</div>
        <CartHeader headerColumns={headerColumns} />
        <CartList list={selectedList} canEdit={false} col={col} />
        <ShippingList freightList={freightList} selectedTem={selectedTem} setSelectedTem={setSelectedTem} />
        <div className="flex px-2.5 mt-2.5">
          <div className="flex-shrink-0 w-16">订单备注:</div>
          <TextArea placeholder="请输入备注" onChange={(e) => setConsumerRemark(e.target.value)} />
        </div>
        <div className="flex flex-col items-end px-2.5">
          <div className="py-4">
            <span className="font-bold mr-2.5">应付金额: </span>
            <span className="text-3xl text-red-500 font-bold">{`￥${toDecimal(totalPrice + (selectedTem?.orderFreight ?? 0))}`}</span>
          </div>
          <div className="btn-submit" onClick={handleSubmit}>
            提交订单
          </div>
        </div>
        <EditAddressForm isVisible={isVisible} id={editingAddressId} onCancel={closeModal} updateAddress={updateAddress} addNewAddress={addNewAddress} />
      </div>
    </Spin>
  );
};

const mapStateToProps = ({ cart, loading }: { cart: CartModelState; loading: Loading }) => {
  return {
    originalList: cart.originalList,
    totalPrice: cart.totalPrice,
    loading: loading.effects['cart/fetchCartInfo'],
  };
};

export default connect(mapStateToProps)(ConfirmOrder);
