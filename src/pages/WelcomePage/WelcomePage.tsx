import React, { useContext } from 'react';
import styles from './WelcomePage.module.scss';

import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Space } from 'antd';
import BtnAccount from '../../components/BtnAccount';
import { StoreContext } from '../../store/StoreProvider';
import { observer } from 'mobx-react-lite';

const WelcomePage = () => {
  const store = useContext(StoreContext);
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/hell-llex"
        >
          hell-llex
        </a>
      ),
      icon: (
        <Avatar
          size="small"
          style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
        >
          H
        </Avatar>
      ),
    },
    {
      key: '2',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/auddax"
        >
          auddax
        </a>
      ),
      icon: (
        <Avatar
          size="small"
          style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
        >
          A
        </Avatar>
      ),
    },
    {
      key: '3',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/shalick"
        >
          shalick
        </a>
      ),
      icon: (
        <Avatar
          size="small"
          style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
        >
          S
        </Avatar>
      ),
    },
  ];

  return (
    <div className={styles['welcome-page']}>
      <p>Welcome Page</p>
      <div className={styles['page-content']}>
        <div className={styles['welcome-title']}>
          <span>Добропожаловать на GraphQL созданный&nbsp;</span>
          <Dropdown menu={{ items }}>
            <a
              onClick={(e) => e.preventDefault()}
              style={{
                fontWeight: 'bold',
              }}
            >
              <Space>
                студентами курса RSSchool React 2023 Q1.
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
        <div className={styles['autorisation-info']}>
          <span>Нажмите сюда </span>
          {store.authStore.login ? (
            <BtnAccount showBtn="home" />
          ) : (
            <BtnAccount showBtn="signup" />
          )}
          <span>или сюда чтобы </span>
          {store.authStore.login ? (
            <BtnAccount showBtn="logout" />
          ) : (
            <BtnAccount showBtn="login" />
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(WelcomePage);
