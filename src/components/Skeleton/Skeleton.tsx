import React from 'react';
import styles from './Skeleton.module.scss';
import { Skeleton } from 'antd';

const MySkeleton = () => {
  return (
    <>
      <div className={styles['skeleton-page']}>
        <div className={styles['skeleton-header']}>
          <Skeleton.Image active={true} className={styles['skeleton-logo']} />
          <div className={styles['btns']}>
            <Skeleton.Button active={true} size={'large'} block={false} />
            <Skeleton.Button active={true} size={'large'} block={false} />
          </div>
        </div>
        <div className={styles['skeleton-main']}>
          <Skeleton paragraph={{ rows: 5 }} active />
        </div>
        <div className={styles['skeleton-footer']}>
          <Skeleton paragraph={{ rows: 1 }} active />
          <Skeleton.Button active={true} size={'large'} block={false} />
        </div>
      </div>
    </>
  );
};

export { MySkeleton };
