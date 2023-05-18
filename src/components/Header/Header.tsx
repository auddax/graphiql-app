import React from 'react';
import styles from './Header.module.scss';
import BtnAccount from '../BtnAccount';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className={styles['header']}>
      <div className={styles['header-content']}>
        <NavLink to="/">
          <img src="./logo.png" className={styles['logo']} />
        </NavLink>
        <BtnAccount showBtn="All" />
      </div>
    </div>
  );
};

export default Header;
