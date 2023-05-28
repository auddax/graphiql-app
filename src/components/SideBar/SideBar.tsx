import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../store/StoreProvider';
import { Button, Col, Layout, Row } from 'antd';
import { ReadFilled, ReadOutlined } from '@ant-design/icons';
import SchemaViewer from '../SchemaViewer';
import styles from './SideBar.module.scss';

const { Sider } = Layout;

const SideBar: React.FC = () => {
  const store = useContext(StoreContext);
  const [collapsed, setCollapsed] = useState(true);
  useEffect(() => {
    store.schemaStore.requestSchema();
  }, []);

  return (
    <Sider
      trigger={null}
      theme="light"
      collapsible
      collapsed={collapsed}
      width={400}
      style={{ backgroundColor: 'transparent'}}
    >
      <Row className={styles['side-bar']}>
        <Col className={styles['side-bar-controls']} span={4}>
          <Button onClick={() => setCollapsed(!collapsed)} type='text' >
            {collapsed ? <ReadOutlined style={{ fontSize: '1.5rem', color: '#595959'}} /> : <ReadFilled style={{ fontSize: '1.5rem', color: '#595959'}} />}
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
