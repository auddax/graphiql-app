import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Space } from 'antd';
import { StoreContext } from '../../store/StoreProvider';
import BtnAccount from '../../components/BtnAccount';
import config from '../../../config.json';
import styles from './WelcomePage.module.scss';
import { Card } from '../../components/PersonCard';

const WelcomePage = () => {
  const store = useContext(StoreContext);
  const locale = store.localeStore.locale;
  const { welcomePage } = locale === 'ru' ? config.locale.ru : config.locale.en;
  const { title, authStart, authEnd, titleAbout } = welcomePage;

  return (
    <div className={styles['welcome-page']}>
      <div className={styles['page-content']}>
        <div className={styles['welcome-title']}>
          <span>{title}</span>
        </div>
        <div className={styles['autorisation-info']}>
          <span>{authStart}</span>
          {store.authStore.login ? (
            <BtnAccount showBtn="home" />
          ) : (
            <BtnAccount showBtn="signup" />
          )}
          <span>{authEnd}</span>
          {store.authStore.login ? (
            <BtnAccount showBtn="logout" />
          ) : (
            <BtnAccount showBtn="login" />
          )}
        </div>
        <h2>{titleAbout}</h2>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Card person={'auddax'} />
          <Card person={'hell-llex'} />
          <Card person={'shalick'} />
        </Space>
      </div>
    </div>
  );
};

export default observer(WelcomePage);
