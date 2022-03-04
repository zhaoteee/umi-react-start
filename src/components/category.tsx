import React from 'react';
import { useEffect, useState } from 'react';
import styles from '@/pages/home/home.less';

import { Card } from 'antd';
import CategoryItem from './categoryItem';

export type FenleiType = { id: number; name: string }[];
export type BaseResType = {
  code: number;
  msg: string;
  classification: FenleiType;
  color: FenleiType;
  tag: FenleiType;
};
type pageType = { classification: FenleiType; color: FenleiType; tag: FenleiType; show: boolean };

const Category: React.FC<pageType> = ({ classification, color, tag, show }) => {
  const [loading, setLoading] = useState(true);
  const showStyle = show ? { height: 'unset', overflow: 'unset', opacity: '1' } : { height: 0, overflow: 'hidden', opacity: '0' };
  useEffect(() => {
    if (classification.length && color.length && tag.length) {
      setLoading(false);
    }
  }, [classification, color, tag]);
  return (
    <Card className={`${styles.cate} myCategoryCard`} style={showStyle} loading={loading}>
      <CategoryItem name="分类" type="1" list={classification} />
      <CategoryItem name="颜色" type="2" list={color} />
      <CategoryItem name="Tag" type="3" list={tag} />
    </Card>
  );
};
export default Category;
