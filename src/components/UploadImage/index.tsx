import React from 'react';
import type { FC } from 'react';
import { Upload, Image, message } from 'antd';
import { history } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile, UploadChangeParam } from 'antd/es/upload/interface';
import { uploadImageUrl, getBase64 } from '@/utils/util';
import { errorHandler, tokenValidCodeList } from '@/utils/request';

type UploadPicProps = {
  fileList?: UploadFile[];
  defaultFileList?: UploadFile[];
  maxCount?: number; // 最大上传数
  onChange?: (info: UploadFile[]) => void;
};
const UploadPicList: FC<UploadPicProps> = (props) => {
  const { fileList, onChange, maxCount = 30, ...others } = props;
  const [innerFileList, setInnerFileList] = React.useState(fileList || []);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState('');
  const headers = {
    Authorization: localStorage.getItem('token') || '',
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview && file.originFileObj) {
      file.preview = (await getBase64(file.originFileObj)) as string;
    }
    setPreviewImage(file.url || file.preview || '');
    setPreviewVisible(true);
  };

  // const customRequest = async (file:UploadFile) => {
  //   console.log(file)
  // }
  const handleChange = (p: UploadChangeParam) => {
    // 将上传失败的file状态置为error
    if (p.file.response && !p.file.response.success) {
      p.file.status = 'error';
      errorHandler({ response: p.file.response });
      if (tokenValidCodeList.find((c) => c === p.file.response.code)) {
        // 身份认证失败需重新登录
        history.push('/login');
      }
    }
    // 拼接成功上传的图片地址
    if (p.file.response && p.file.status === 'done') {
      const { urlPrefix, path } = p.file.response.data;
      p.file.url = urlPrefix + path;
    }
    // 组件内更新上传图片列表
    setInnerFileList(p.fileList);
    // 将上传成功的图片传到Form组件(数据自行需处理)
    onChange?.(p.fileList.filter((item) => item.status === 'done'));
  };

  // const { previewVisible, previewImage, fileList, previewTitle } = this.state;
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>选择图片</div>
    </div>
  );
  const beforeUpload = (file: File): boolean | string => {
    if (file && file.size > 5120 * 1024) {
      message.warn('图片大小不能超过5M');
      return Upload.LIST_IGNORE;
    }
    return true;
  };
  return (
    <>
      <Upload
        action={uploadImageUrl}
        listType="picture-card"
        headers={headers}
        accept="image/*"
        fileList={innerFileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        {...others}
      >
        {innerFileList.length >= maxCount ? null : uploadButton}
      </Upload>
      {
        <Image
          alt="example"
          preview={{
            visible: previewVisible,
            onVisibleChange: () => {
              setPreviewVisible(false);
            },
          }}
          style={{ width: '100%', display: 'none' }}
          src={previewImage}
        />
      }
    </>
  );
};

export default UploadPicList;
