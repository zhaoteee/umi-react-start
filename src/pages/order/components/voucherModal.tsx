import React, { useEffect, useState, useCallback } from 'react';
import { Modal, message } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import UploadImage from '@/components/UploadImage';
import { uploadCredential, confirmOrder } from '@/services/order';

export type VoucherProps = {
  isShow: boolean;
  id: string;
  onHandleHide: () => void;
  onHandleOK: () => void;
};
const VoucherModal: React.FC<VoucherProps> = (props) => {
  const { isShow, onHandleHide, onHandleOK, id } = props;
  const [imageUrl, setImageUrl] = useState('');
  const hide = () => {
    onHandleHide();
  };
  const handleOk = () => {
    if (!imageUrl) {
      message.info('请上传支付凭证');
      return;
    }
    confirmOrder(id).then((res: any) => {
      if (res.success) {
        message.success('确认成功');
        onHandleOK();
      }
    });
  };
  const onUploadImage = useCallback((imgList: UploadFile[]) => {
    if (imgList.length) {
      setImageUrl(imgList[0].url as string);
      const params = {
        image: imgList[0].url || '',
        orderId: id,
      };
      uploadCredential(params).then((res: any) => {
        if (res.success) {
          message.success('上传成功');
        }
      });
    }
  }, []);
  useEffect(() => {}, []);
  return (
    <Modal title="上传凭证" visible={isShow} onOk={handleOk} onCancel={hide}>
      <UploadImage onChange={onUploadImage} maxCount={1} />
    </Modal>
  );
};
export default VoucherModal;
