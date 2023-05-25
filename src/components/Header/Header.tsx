import React, { useContext } from 'react';
import styles from './Header.module.scss';
import BtnAccount from '../BtnAccount';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../store/StoreProvider';
import BtnLocale from '../BtnLocale';

const Header = () => {
  const store = useContext(StoreContext);

  return (
    <div className={styles['header']}>
      <div className={styles['header-content']}>
        <NavLink to="/welcome" className={styles['logo']}></NavLink>
        <div className={styles['content-btn']}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {store.authStore.login ? (
              <BtnAccount showBtn="home" />
            ) : (
              <BtnAccount showBtn="signup" />
            )}
            {store.authStore.login ? (
              <BtnAccount showBtn="logout" />
            ) : (
              <BtnAccount showBtn="login" />
            )}
          </div>
          <BtnLocale />
        </div>
      </div>
    </div>
  );
};

export default observer(Header);
