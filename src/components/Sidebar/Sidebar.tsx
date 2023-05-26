import React, { useContext } from 'react';
import styles from "./Sidebar.module.scss";
import { StoreContext } from '../../store/StoreProvider';
import { Spin } from 'antd';

const Sidebar = () => {
  const store = useContext(StoreContext);
  const response = store.schemaStore.responseData;
  const isLoading = store.schemaStore.isLoading;
  console.log(JSON.stringify(response, null, 4))
  console.log(response)

  return (
    <>
      <h2>Docs</h2>
      <Spin spinning={isLoading} tip="Загрузка...">
        <pre>{JSON.stringify(response, null, 4)}</pre>
      </Spin>
    </>
  );
};

export default Sidebar;
