import React from 'react';
import styles from './Header.module.scss';
import BtnAccount from '../BtnAccount';

const Header = () => {
  return (
    <div className={styles['header']}>
      <div className={styles['header-content']}>
        Header
      <BtnAccount />
      </div>
    </div>
  );
};

export default Header;
