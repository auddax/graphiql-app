import React from 'react';
import styles from './BtnAccount.module.scss';
import { Button, message } from 'antd';

const BtnAccount = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
      duration: 3,
    });
  };
  return (
    <>
      {contextHolder}
      <div className={styles['btn-account-container']}>
        <Button type="primary" onClick={success}>
          Зарегестрироваться / Войти
        </Button>
      </div>
    </>
  );
};

export default BtnAccount;
