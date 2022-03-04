import React from 'react';
import { useLocation, history } from 'umi';
import { useState, useRef, useEffect } from 'react';
import styles from '@/pages/home/home.less';

export type FenleiType = { id: number; name: string }[];

type pageType = { list: FenleiType; name: string; type: string };
const typeMap = { 1: 'f', 2: 'y', 3: 't' }; // 分类 颜色 tag

const CategoryItem: React.FC<pageType> = ({ list, name, type }) => {
  const location = useLocation();
  const [isMore, setIsMore] = useState(false);
  const [showCmore, setShowCmore] = useState(false);
  const [isRowOne, setisRowOne] = useState(false);
  const wrapRef = useRef(null);
  const contentRef = useRef(null);
  const setHeigh = () => {
    if (wrapRef.current && contentRef.current) {
      const wh = parseFloat(getComputedStyle(wrapRef.current).height);
      const ch = parseFloat(getComputedStyle(contentRef.current).height);
      if (ch > wh) {
        setIsMore(true);
      }
      if (ch <= 76 && ch) {
        // 一行的情况
        setisRowOne(true);
        setIsMore(false);
      }
      if (ch > 76) {
        setIsMore(true);
        setisRowOne(false);
      }
    }
  };
  const getClass = (i: any): string => {
    const key = typeMap[type];
    const val = location.query[key];
    if (val) {
      const id = Number(val.split(',')[0]) || 0;
      const isNav = val.split(',')[2] === 'n';
      if (id && id !== 0 && i.id === id && !isNav) return 'currentItem';
    }
    return '';
  };
  const onClickItem = (i: any) => {
    const key = typeMap[type];
    history.push({ pathname: '/index', query: { ...location.query, [key]: `${i.id},${i.name}` } });
  };
  useEffect(() => {
    setHeigh();
    window.addEventListener('resize', setHeigh);
  }, [wrapRef, contentRef, list]);
  return (
    <div className={styles.row}>
      <div className={styles.name}>{name}:</div>
      <div ref={wrapRef} className={`${styles.ks} ${showCmore || isRowOne ? styles.moreks : ''}`}>
        <div ref={contentRef}>
          {list.map((i) => (
            <span className={getClass(i)} onClick={() => onClickItem(i)} key={i.id}>
              {i.name}
            </span>
          ))}
        </div>
        {isMore ? (
          <span className={styles.more} onClick={() => setShowCmore(!showCmore)}>
            {showCmore ? '收起' : '更多'}
          </span>
        ) : null}
      </div>
    </div>
  );
};
export default CategoryItem;
