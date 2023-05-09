import React, { useState } from 'react';
import { Button, Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import styles from './MainPage.module.scss';
import CodePlayground from '../../components/CodePlayground';

const { Header, Footer, Sider, Content } = Layout;

const MainPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout className={styles['main-page']}>
      <Header></Header>
      <Layout>
        <Sider 
          trigger={null}
          theme='light'
          collapsible
          collapsed={collapsed}
          width={500}
        >
        <Button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        </Sider>
        <Content className={styles['page-content']}>
          <CodePlayground />
        </Content>
      </Layout>
      <Footer></Footer>
    </Layout>
  );
};

export default MainPage;
