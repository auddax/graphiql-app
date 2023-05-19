import React, { useContext, useState } from 'react';
import styles from './BtnAccount.module.scss';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { StoreContext } from '../../store/StoreProvider';
import { observer } from 'mobx-react-lite';

const BtnAccount = observer((props: { showBtn: string }) => {
  const store = useContext(StoreContext);
  const [show, setShow] = useState(props.showBtn);

  return (
    <>
      <div className={styles['btn-account-container']}>
        {store.authStore.login ? (
          <Button
            type="primary"
            onClick={() => {
              store.authStore.logOutUser();
            }}
          >
            Выйти
          </Button>
        ) : (
          <>
            {show === 'All' || show === 'Login' ? (
              <NavLink to="/auth/login">
                <Button type="primary">Войти</Button>
              </NavLink>
            ) : null}
            {show === 'SignUp' || show === 'All' ? (
              <NavLink to="/auth/signup">
                <Button type="primary">Зарегистрироваться</Button>
              </NavLink>
            ) : null}
          </>
        )}
      </div>
    </>
  );
});

export default BtnAccount;
