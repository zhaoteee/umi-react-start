import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'umi';
import styles from './detail.less';
import request from '@/utils/request';
import { Card, Descriptions, Button, Modal } from 'antd';
import type { StoreContextType } from '@/components/layout';
import type { BaseType, FenleiType } from '@/pages/home/index';
import PageLoading from '@/components/pageLoading';
import { StoreContext } from '@/components/layout';

export type ResourceType = {
  id: number;
  img: string;
  name: string;
  remark: string | null;
  viewUrl: string;
  hot: number;
};
export type PageResType = {
  code: number;
  msg: string;
  color: FenleiType;
  classification: FenleiType;
  tag: FenleiType;
  resource: ResourceType;
};

type detailQuery = { id: string };
type BasicProps = {
  location: {
    query: detailQuery;
  };
};
const Detail: React.FC<BasicProps> = (props) => {
  const base: BaseType[] = JSON.parse(localStorage.getItem('base') || '[]');
  const qq: BaseType | undefined = base.find((i) => i.code === 'qq');
  const qqurl = qq ? qq.value : 'tencent://message/?uin=1163363720&amp;Menu=yes&amp;Service=300&amp;sigT=42a1e5347953b64c5ff3980f8a6e644d4b31456cb0b6ac6b27663a3c4dd0f4aa14a543b1716f9d45';
  const [btnLoading, setBtnLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const { state } = useContext<StoreContextType>(StoreContext);
  const [info, setInfo] = useState<PageResType>({
    code: 0,
    msg: '',
    color: [],
    classification: [],
    tag: [],
    resource: { id: 0, img: '', name: '', viewUrl: '', remark: '', hot: 0 },
  });
  const { location } = props;
  const getData = (id: any) => {
    if (!id) return;
    setPageLoading(true);
    request<PageResType>('/api/static/detail', { method: 'get', params: { id } })
      .then((r) => {
        const res = r.data;
        if (res.code === 0 && res.msg === 'success') {
          console.log(res);
          setInfo(res);
        }
        setPageLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setPageLoading(false);
      });
  };
  const download = () => {
    if (!state.token) {
      Modal.info({ title: '提示', okText: '确定', content: '请先登录' });
      return;
    }
    setBtnLoading(true);
    request<BlobPart>('/api/static/down', { method: 'get', params: { id: location.query.id }, responseType: 'blob' })
      .then((res) => {
        const content = res.response.headers.get('content-disposition');
        if (!content) return;
        const blob = new Blob([res.data], { type: 'application/zip' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a'); // 创建a标签
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        setBtnLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setBtnLoading(false);
      });
  };
  useEffect(() => {
    getData(location.query.id);
  }, [location.query.id]);
  return (
    <div>
      <Card className={styles.info}>
        <Descriptions labelStyle={{ width: '200px' }} title={info.resource.name} bordered>
          <Descriptions.Item span={3} label="下载热度">
            <span style={{ fontWeight: 600 }}>{info.resource.hot}</span>
          </Descriptions.Item>
          <Descriptions.Item span={3} label="模板分类">
            {info.classification.map((i) => `${i.name} `)}
          </Descriptions.Item>
          <Descriptions.Item span={3} label="模板颜色">
            {info.color.map((i) => `${i.name} `)}
          </Descriptions.Item>
          <Descriptions.Item span={3} label="模板标签">
            {info.tag.map((i) => `${i.name} `)}
          </Descriptions.Item>
          <Descriptions.Item span={3} label="免责声明">
            本站不以盈利为目的，所有资源均来自互联网，如有侵权请联系站长删除
          </Descriptions.Item>
        </Descriptions>
        <div className={styles.btns}>
          <Link to={info.resource.viewUrl} target="_blank">
            <Button type="primary">在线预览</Button>
          </Link>
          <Button type="primary" loading={btnLoading} onClick={download}>
            免费下载
          </Button>
          <Button type="primary">
            <a href={qqurl}>运维支持</a>
          </Button>
        </div>
      </Card>
      <Card className={styles.preview}>
        <h4>效果预览</h4>
        <div>
          <img style={{ width: '100%' }} src={info.resource.img} alt={info.resource.name} />
        </div>
      </Card>
      <PageLoading loading={pageLoading}></PageLoading>
    </div>
  );
};

export default Detail;
