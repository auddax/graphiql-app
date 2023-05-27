import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../store/StoreProvider';
import { Button, Col, Layout, Row } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import SchemaViewer from '../SchemaViewer';
import styles from './SideBar.module.scss';

const { Sider } = Layout;

const SideBar: React.FC = () => {
  const store = useContext(StoreContext);
  const [collapsed, setCollapsed] = useState(true);
  const response = store.schemaStore.responseData;
  const isLoading = store.schemaStore.isLoading;
  useEffect(() => {
    store.schemaStore.sendRequest();
  }, []);

  return (
    <Sider
      trigger={null}
      theme="light"
      collapsible
      collapsed={collapsed}
      width={400}
    >
      <Row className={styles['side-bar']}>
        <Col className={styles['side-bar-controls']} span={4}>
          <Button onClick={() => setCollapsed(!collapsed)} >
            {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </Button>
        </Col>
        <Col className={styles['side-bar-viewer']} span={20}>
         {!collapsed &&  <SchemaViewer />}
        </Col>
      </Row>
    </Sider>
  );
};

export default observer(SideBar);
