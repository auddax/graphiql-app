import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { StoreContext } from '../../store/StoreProvider';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import LogIn from '../../components/LogIn/LogIn';
import SignUp from '../../components/SignUp/SignUp';
import config from '../../../config.json';
import styles from './AuthPage.module.scss';

const AuthPage = () => {
  const store = useContext(StoreContext);
  const { page } = useParams();
  const navigate = useNavigate();
  const locale = store.localeStore.locale;
  const { authPage } = locale === 'ru' ? config.locale.ru : config.locale.en;
  const { title, subtitle, titleAuth, subtitleAuth, registerBtn, signinBtn, titleMobile } = authPage;

  useEffect(() => {
    if (page === 'login' || page === 'signup') {
      return store.authStore.toggleLoginPage(page === 'login' ? true : false);
    }
    return navigate('/404');
  }, [page]);

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
                  <h1>{titleAuth}</h1>
                  <p>{subtitleAuth}</p>
                  <p className={styles['title-mobile']}>{titleMobile}</p>
                  <NavLink to="/auth/login">
                    <Button className={styles['ghost']}>{signinBtn}</Button>
                  </NavLink>
                </div>
                <div
                  className={[
                    styles['overlay-panel'],
                    styles['overlay-right'],
                  ].join(' ')}
                >
                  <h1>{title}</h1>
                  <p>{subtitle}</p>
                  <p className={styles['title-mobile']}>{titleMobile}</p>
                  <NavLink to="/auth/signup">
                    <Button className={styles['ghost']}>
                      {registerBtn}
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
};

export default observer(AuthPage);
