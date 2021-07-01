import React, { useEffect, useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Card, Radio, Space, Descriptions, Modal } from 'antd';
import { toDecimal } from '@/utils/util';
import useBoolean from '@/hooks/useBoolean';
import UploadImage from '@/components/UploadImage';
import type { UploadFile } from 'antd/es/upload/interface';
import { uploadCredential } from '@/services/order';
import type { OrderPayStatus } from '@/pages/cart/PayOrder';

export type payDetailType = {
  distributorIntegralPayEnable: boolean; // 是否开启经销商积分支付
  distributorRebatePayEnable: boolean; // 是否开启经销商返利支付
  distributorRebatePayBankAccountName: string; // 经销商返利支付开户名称
  distributorRebatePayBankAccountNum: string; // 经销商返利支付开户账号
  distributorRebatePayBankName: string; // 经销商返利支付开户行名称
  orderId?: string;
  integral: number; // 积分
  integralAmount: number; // 积分抵扣金额
  rebateAmount: number; // 返利抵扣金额
  supplierName: string; // 下单店铺名称
  totalAmount: number; // 订单总金额
  totalIntegral: number; // 剩余积分
  totalRebate: number; // 剩余返利
};
type PaddingPayOrderType = {
  detail: payDetailType;
  setStatus: React.Dispatch<React.SetStateAction<OrderPayStatus>>;
};
type payWayType = 'INTEGRAL_PAY' | 'REBATE_PAY' | null;
const PaddingPayOrder: React.FC<PaddingPayOrderType> = ({ detail }) => {
  const [isVisible, { setTrue: openModal, setFalse: closeModal }] = useBoolean(false);
  const [payWay, setPayWay] = useState<payWayType>(null);
  const [remainAmount, setRemainAmount] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    if (detail.distributorIntegralPayEnable && !detail.distributorRebatePayEnable) {
      setPayWay('INTEGRAL_PAY');
    }
    if (!detail.distributorIntegralPayEnable && detail.distributorRebatePayEnable) {
      setPayWay('REBATE_PAY');
    }
    setRemainAmount(detail.totalAmount);
  }, [detail.distributorIntegralPayEnable, detail.distributorRebatePayEnable, detail.totalAmount]);

  const handlePayChange = (e: RadioChangeEvent) => {
    const { value } = e.target;
    setPayWay(value);
    if (value === 'INTEGRAL_PAY') {
      setRemainAmount(detail.totalAmount - detail.integralAmount);
    }
    if (value === 'REBATE_PAY') {
      setRemainAmount(detail.totalAmount - detail.rebateAmount);
    }
  };
  const onUploadImage = (imgList: UploadFile[]) => {
    if (imgList.length) {
      setImageUrl(imgList[0].url as string);
    }
  };
  const handleOk = () => {
    const params = {
      image: imageUrl,
      orderId: '5852293575352101480', // detail.orderId as string,
    };
    uploadCredential(params).then((res) => {
      console.log(res);
    });
  };
  return (
    <div>
      <Card bordered={false}>
        <div className="flex items-center">
          <div className="mr-5">
            <span>应付金额:</span>
            <span className="font-bold text-2xl text-red-500">{`￥${toDecimal(detail.totalAmount)}`}</span>
          </div>
          <div>
            <span>下单店铺:</span>
            <span>{detail.supplierName}</span>
          </div>
        </div>
      </Card>
      <Card bordered={false}>
        <Radio.Group value={payWay} onChange={handlePayChange}>
          <Space direction="vertical">
            {detail.distributorIntegralPayEnable && <Radio value={'INTEGRAL_PAY'}>{`可用${detail.integral}积分抵扣￥${toDecimal(detail.integralAmount)}（积分余额${detail.totalIntegral}）`}</Radio>}
            {detail.distributorRebatePayEnable && <Radio value={'REBATE_PAY'}>{`返利可抵￥${toDecimal(detail.rebateAmount)} （返利余额￥${toDecimal(detail.totalRebate)}）`}</Radio>}
          </Space>
        </Radio.Group>
        <div className="py-5">
          <span>剩余应付: </span>
          <span className="text-red-500 font-bold">{`￥${toDecimal(remainAmount)}`}</span>
        </div>
        {remainAmount > 0 && (
          <Card className="w-128">
            <Descriptions column={1}>
              <Descriptions.Item label="开户名称">{detail.distributorRebatePayBankAccountName}</Descriptions.Item>
              <Descriptions.Item label="开户银行">{detail.distributorRebatePayBankName}</Descriptions.Item>
              <Descriptions.Item label="帐号">{detail.distributorRebatePayBankAccountNum}</Descriptions.Item>
              {/* <Descriptions.Item label="说明">积分或返利支付不足时，也可点击确认支付，并将剩余金额通过其他方式汇入以上帐户。</Descriptions.Item> */}
            </Descriptions>
          </Card>
        )}
      </Card>
      <div className="text-right px-5">
        <div className="btn-submit inline-block" onClick={openModal}>
          确认
        </div>
      </div>
      <Modal visible={isVisible} onCancel={closeModal} onOk={handleOk} title={'上传凭证'}>
        <UploadImage onChange={onUploadImage} maxCount={1} />
      </Modal>
    </div>
  );
};

export default PaddingPayOrder;
