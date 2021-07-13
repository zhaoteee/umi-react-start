import React, { useCallback, useEffect, useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Card, Radio, Space, Descriptions, Modal, Button, notification } from 'antd';
import { toDecimal } from '@/utils/util';
import useBoolean from '@/hooks/useBoolean';
import UploadImage from '@/components/UploadImage';
import type { UploadFile } from 'antd/es/upload/interface';
import { payOrder, uploadCredential } from '@/services/order';
import { history } from 'umi';

export type payDetailType = {
  distributorIntegralPayEnable: boolean; // 是否开启经销商积分支付
  distributorRebatePayEnable: boolean; // 是否开启经销商返利支付
  distributorRebatePayBankAccountName: string; // 经销商返利支付开户名称
  distributorRebatePayBankAccountNum: string; // 经销商返利支付开户账号
  distributorRebatePayBankName: string; // 经销商返利支付开户行名称
  integral: number; // 积分
  integralAmount: number; // 积分抵扣金额
  rebateAmount: number; // 返利抵扣金额
  supplierName: string; // 下单店铺名称
  totalAmount: number; // 订单总金额
  totalIntegral: number; // 剩余积分
  totalRebate: number; // 剩余返利
  orderStatus: orderStatusType;
};

export type orderStatusType = 'WAIT_PAY' | 'PART_PAY' | 'WAIT_CONFIRM' | 'WAIT_SHIP' | 'PART_SHIP' | 'SHIPED' | 'CANCELED';

type PaddingPayOrderType = {
  orderId: string;
  detail: payDetailType;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

type payWayType = 'INTEGRAL_PAY' | 'REBATE_PAY' | '';

const PaddingPayOrder: React.FC<PaddingPayOrderType> = ({ detail, orderId, setLoading }) => {
  const { distributorIntegralPayEnable, distributorRebatePayEnable, rebateAmount, totalAmount, integralAmount } = detail;
  const [isVisible, { setTrue: openModal, setFalse: closeModal }] = useBoolean(false);
  const [payMethod, setPayMethod] = useState<payWayType>('');
  const [remainAmount, setRemainAmount] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState('');
  const [hasPayed, setHasPayed] = useState(false);

  useEffect(() => {
    setHasPayed(detail.orderStatus !== 'WAIT_PAY');
  }, [detail.orderStatus]);

  useEffect(() => {
    if (distributorIntegralPayEnable) {
      setPayMethod('INTEGRAL_PAY');
      setRemainAmount(totalAmount - integralAmount);
      return;
    }
    if (distributorRebatePayEnable) {
      setPayMethod('REBATE_PAY');
      setRemainAmount(totalAmount - rebateAmount);
      return;
    }
    setPayMethod('');
    setRemainAmount(totalAmount);
  }, [distributorIntegralPayEnable, distributorRebatePayEnable, integralAmount, rebateAmount, totalAmount]);

  const handlePayChange = (e: RadioChangeEvent) => {
    const { value } = e.target;
    setPayMethod(value);
    if (value === 'INTEGRAL_PAY') {
      setRemainAmount(totalAmount - integralAmount);
    }
    if (value === 'REBATE_PAY') {
      setRemainAmount(totalAmount - rebateAmount);
    }
  };
  const onUploadImage = useCallback((imgList: UploadFile[]) => {
    if (imgList.length) {
      setImageUrl(imgList[0].url as string);
    }
  }, []);

  const handlePay = () => {
    // 如果返利支付或者积分支付没有权限 或者 已经支付 直接展示上传凭证窗口
    if ((!distributorIntegralPayEnable && !distributorRebatePayEnable) || hasPayed) {
      openModal();
      return;
    }
    setLoading(true);
    const params = {
      orderId,
      payMethod,
    };
    payOrder(params)
      .then((res: any) => {
        setLoading(false);
        if (res.success) {
          setHasPayed(true);
          if (remainAmount > 0) {
            openModal();
          } else {
            history.replace(`/mall/cart/payed?orderId=${orderId}`);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleOk = () => {
    if (!imageUrl) {
      notification.warn({
        message: '支付凭证不能为空',
      });
      return;
    }
    const params = {
      image: imageUrl,
      orderId,
    };
    uploadCredential(params).then((res: any) => {
      if (res.success) {
        history.replace(`/mall/cart/payed?orderId=${orderId}`);
      }
    });
  };
  const handleCancel = () => {
    closeModal();
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
      <div className="px-6">
        {(distributorIntegralPayEnable || distributorRebatePayEnable) && (
          <Radio.Group value={payMethod} onChange={handlePayChange}>
            <Space direction="vertical">
              {distributorIntegralPayEnable && <Radio value={'INTEGRAL_PAY'}>{`可用${detail.integral}积分抵扣￥${toDecimal(detail.integralAmount)}（积分余额${detail.totalIntegral}）`}</Radio>}
              {distributorRebatePayEnable && <Radio value={'REBATE_PAY'}>{`返利可抵￥${toDecimal(detail.rebateAmount)} （返利余额￥${toDecimal(detail.totalRebate)}）`}</Radio>}
            </Space>
          </Radio.Group>
        )}
        <div className="py-5">
          <span>剩余应付: </span>
          <span className="text-red-500 font-bold">{`￥${toDecimal(remainAmount)}`}</span>
        </div>
        {remainAmount > 0 && (
          <>
            <Card className="w-128" title="线下打款">
              <Descriptions column={1}>
                <Descriptions.Item label="开户名称">{detail.distributorRebatePayBankAccountName}</Descriptions.Item>
                <Descriptions.Item label="开户银行">{detail.distributorRebatePayBankName}</Descriptions.Item>
                <Descriptions.Item label="帐号">{detail.distributorRebatePayBankAccountNum}</Descriptions.Item>
              </Descriptions>
            </Card>
          </>
        )}
      </div>
      <div className="text-right px-5">
        <Button type="primary" size="large" onClick={handlePay}>
          {(!distributorIntegralPayEnable && !distributorRebatePayEnable) || hasPayed ? '上传凭证' : '确认支付'}
        </Button>
      </div>
      <Modal visible={isVisible} cancelText="待会上传" okText="确认上传" onCancel={handleCancel} onOk={handleOk} title={'上传凭证'}>
        <UploadImage onChange={onUploadImage} maxCount={1} />
      </Modal>
    </div>
  );
};

export default PaddingPayOrder;
