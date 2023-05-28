import React, { useContext } from 'react';
import { Layout, Spin } from 'antd';
import { StoreContext } from '../../store/StoreProvider';
import { observer } from 'mobx-react-lite';
import styles from './ResponseViewer.module.scss';

const ResponseViewer = () => {
  const store = useContext(StoreContext);
  const response = store.editorStore.responseData;
  const isLoading = store.editorStore.isLoading;
  
  return (
    <Layout className={styles['response-viewer']}>
      <Spin spinning={isLoading} tip="Загрузка..." wrapperClassName={styles['viewer-spinner']}>
        <pre className={styles['viewer-content']}>{JSON.stringify(response, null, 4)}</pre>
      </Spin>
    </Layout>
  );
};

export default observer(ResponseViewer);
