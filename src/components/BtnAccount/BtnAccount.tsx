import React, { useContext, useState } from 'react';
import { Button } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { typeBtnAuth } from '../../types';
import { StoreContext } from '../../store/StoreProvider';
import config from '../../../config.json';
import styles from './BtnAccount.module.scss';

const BtnAccount = (props: { showBtn: typeBtnAuth }) => {
  const store = useContext(StoreContext);
  const navigate = useNavigate();
  const locale = store.localeStore.locale;
  const { buttons } = locale === 'ru' ? config.locale.ru : config.locale.en;
  const { signin, signout, register, mainPage } = buttons;
  return (
    <>
      <div className={styles['btn-account-container']}>
        {props.showBtn === 'login' ? (
          <NavLink to="/auth/login">
            <Button type="primary">{signin}</Button>
          </NavLink>
        ) : null}

        {props.showBtn === 'logout' ? (
          <Button
            type="primary"
            onClick={() => {
              store.authStore.logOutUser().then((success) => {
                navigate('/')
              });
            }}
          >
            {signout}
          </Button>
        ) : null}

        {props.showBtn === 'signup' ? (
          <NavLink to="/auth/signup">
            <Button type="primary">{register}</Button>
          </NavLink>
        ) : null}

        {props.showBtn === 'home' ? (
          <NavLink to="/main">
            <Button type="primary">{mainPage}</Button>
          </NavLink>
        ) : null}
      </div>
    </>
  );
};

export default observer(BtnAccount);
