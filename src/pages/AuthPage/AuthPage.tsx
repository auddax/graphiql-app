import styles from './AuthPage.module.scss';
import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import LogIn from '../../components/LogIn/LogIn';
import SignUp from '../../components/SignUp/SignUp';
import { Button } from 'antd';
import { StoreContext } from '../../store/StoreProvider';
import { NavLink, useNavigate } from 'react-router-dom';

const AuthPage = observer((props: { loginPage: boolean }) => {
  const store = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (store.authStore.login) navigate('/');
    return;
  }, []);

  useEffect(() => {
    if (store.authStore.login)
      setTimeout(() => {
        navigate('/main');
      }, 100);
  }, [store.authStore.login]);

  useEffect(() => {
    store.authStore.toggleLoginPage(props.loginPage);
  }, [props.loginPage]);

  return (
    <>
      <div className={styles['auth-page']}>
        <div className={styles['page-content']}>
          <div
            className={[
              styles['container'],
              styles[store.authStore.showLoginPage ? '' : 'right-panel-active'],
            ].join(' ')}
          >
            <div
              className={[
                styles['form-container'],
                styles['sign-up-container'],
              ].join(' ')}
            >
              <SignUp />
            </div>
            <div
              className={[
                styles['form-container'],
                styles['log-in-container'],
              ].join(' ')}
            >
              <LogIn />
            </div>
            <div className={styles['overlay-container']}>
              <div className={styles['overlay']}>
                <div
                  className={[
                    styles['overlay-panel'],
                    styles['overlay-left'],
                  ].join(' ')}
                >
                  <h1>С возвращением!</h1>
                  <p>Введите свои личные данные и начните пользоваться!</p>
                  <NavLink to="/auth/login">
                    <Button className={styles['ghost']}>Войти</Button>
                  </NavLink>
                </div>
                <div
                  className={[
                    styles['overlay-panel'],
                    styles['overlay-right'],
                  ].join(' ')}
                >
                  <h1>Привет!</h1>
                  <p>
                    Чтобы начать пользоваться, пожалуйста, войдите в систему,
                    используя вашу электронную почту и пароль
                  </p>
                  <NavLink to="/auth/signup">
                    <Button className={styles['ghost']}>
                      Зарегестрироваться
                    </Button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default AuthPage;
