import { StoreContext } from '../../store/StoreProvider';
import { message } from 'antd';
import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './Message.module.scss';

const addMessage = () => {
  const store = useContext(StoreContext);
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type:
        store.authStore.messageInfo.type === 'success' ? 'success' : 'error',
      content: store.authStore.messageInfo.content,
      duration: 3,
      style: {
        marginTop: '1vh',
      },
    });
  };

  const requestError = () => {
    messageApi.open({
      type: store.editorStore.isError ? 'error' : 'success',
      content: store.editorStore.errorMessage,
      duration: 3,
      style: {
        marginTop: '1vh',
      },
    });
  };


  useEffect(() => {
    if (store.authStore.messageInfo.isReady) success();
    if (store.editorStore.isError) requestError();
  }, [store.authStore.messageInfo.isReady, store.editorStore.isError]);

  return <>{contextHolder}</>;
};

export default observer(addMessage);
