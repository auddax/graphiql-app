import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import { Button, Col, Row, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import styles from "./SchemaViewer.module.scss";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const SchemaViewer = () => {
  const store = useContext(StoreContext);
  const response = store.schemaStore.responseData;
  const isLoading = store.schemaStore.isLoading;

  return (
    <>
      <h2>Docs</h2>
      <Spin spinning={isLoading} tip="Загрузка...">
        <pre>{JSON.stringify(response, null, 4)}</pre>
      </Spin>
    </>
  );
};

export default observer(SchemaViewer);
