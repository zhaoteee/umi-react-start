// import styles from './index.less';
import React, { useState, useEffect } from 'react';

import styles from './search.less';

export default function Search() {
  return (
    <div className={styles.searchArea}>
      <div className={styles.attr}>
          <div className={styles.attrKey}>品牌方</div>
          <div className={styles.attrValues}>
              <ul className={styles.collapse}>
                  <li>ZARA</li>
                  <li>PCR商城</li>
                  <li>车空间配件商城</li>
                  <li>CARTELO/卡帝乐鳄鱼</li>
                  <li>Cardanro/卡丹路</li>
                  <li>Skechers/斯凯奇</li>
                  <li>PLAYBOY/花花公子</li>
              </ul>
              <div className={styles.options}>
                  <a>多选</a>
                  <a>更多</a>
              </div>
          </div>
      </div>
      <div className={styles.attr}>
          <div className={styles.attrKey}>品牌</div>
          <div className={styles.attrValues}>
              <ul className={styles.collapse}>
                  <li>朝阳CHAOYANG</li>
                  <li>嘉实多</li>
                  <li>好运</li>
                  <li>威狮</li>
                  <li>壳牌</li>
                  <li>钢盾</li>
              </ul>
              <div className={styles.options}>
                  <a>多选</a>
                  <a>更多</a>
              </div>
          </div>
      </div>
      <div className={styles.attr}>
          <div className={styles.attrKey}>分类</div>
          <div className={styles.attrValues}>
              <ul className={styles.collapse}>
                  <li>机油</li>
                  <li>刹车油</li>
              </ul>
              <div className={styles.options}>
                  <a>多选</a>
                  <a>更多</a>
              </div>
          </div>
      </div>
    </div>
  );
}
