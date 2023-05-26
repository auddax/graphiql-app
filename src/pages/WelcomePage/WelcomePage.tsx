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
        <h2 className={styles['welcome-title']}>{title}</h2>
        <Space className={styles['autorisation-info']} wrap>
          <Space>
            <p>{authStart}</p>
            {store.authStore.login ? (
              <BtnAccount showBtn="home" />
            ) : (
              <BtnAccount showBtn="signup" />
            )}
          </Space>
          <Space>
            <p>{authEnd}</p>
            {store.authStore.login ? (
              <BtnAccount showBtn="logout" />
            ) : (
              <BtnAccount showBtn="login" />
            )}
          </Space>
        </Space>

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
