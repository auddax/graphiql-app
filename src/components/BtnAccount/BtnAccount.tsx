import React, { useContext, useState } from 'react';
import styles from './BtnAccount.module.scss';
import { Button } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { typeBtnAuth } from '../../types';
import { StoreContext } from '../../store/StoreProvider';

const BtnAccount = (props: { showBtn: typeBtnAuth }) => {
  const store = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <>
      <div className={styles['btn-account-container']}>
        {props.showBtn === 'login' ? (
          <NavLink to="/auth/login">
            <Button type="primary">Войти</Button>
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
            Выйти
          </Button>
        ) : null}

        {props.showBtn === 'signup' ? (
          <NavLink to="/auth/signup">
            <Button type="primary">Зарегестрироваться</Button>
          </NavLink>
        ) : null}

        {props.showBtn === 'home' ? (
          <NavLink to="/main">
            <Button type="primary">Главная страница</Button>
          </NavLink>
        ) : null}
      </div>
    </>
  );
};

export default observer(BtnAccount);
