import styles from './Message.module.scss';

import { StoreContext } from '../../store/StoreProvider';

import { message } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

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

  useEffect(() => {
    if (store.authStore.messageInfo.isReady) success();
  }, [store.authStore.messageInfo.isReady]);

  return <>{contextHolder}</>;
};

export default observer(addMessage);
