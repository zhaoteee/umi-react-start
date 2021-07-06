import React, { useEffect, useState } from 'react';
import { Modal, message } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import UploadImage from '@/components/UploadImage';
import { uploadCredential } from '@/services/order';

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
      return
    }
    const params = {
      image: imageUrl,
      orderId: id,
    };
    uploadCredential(params).then((res: any) => {
      if (res.success) {
        message.success('提交成功');
        onHandleOK();
      }
    });
  };
  const onUploadImage = (imgList: UploadFile[]) => {
    if (imgList.length) {
      setImageUrl(imgList[0].url as string);
    }
  };
  useEffect(() => {
  }, []);
  return (
    <Modal title="上传凭证" visible={isShow} onOk={handleOk} onCancel={hide}>
      <UploadImage onChange={onUploadImage} maxCount={1} />
    </Modal>
  );
};
export default VoucherModal;
