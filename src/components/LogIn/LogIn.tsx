import styles from './LogIn.module.scss';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { StoreContext } from '../../store/StoreProvider';

import { Button, Form, Input } from 'antd';
import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { UserDataLog } from '../../types';

const LogIn = observer(() => {
  const store = useContext(StoreContext);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!store.authStore.showLoginPage) form.resetFields();
    if (store.authStore.login) form.resetFields();
  }, [store.authStore.showLoginPage, store.authStore.login]);

  const onFinish = (values: UserDataLog) => {
    console.log('Received values', values);

    store.authStore.setLogin(values);
  };

  return (
    <>
      <div className={styles['login-form']}>
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="E-mail"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your valid Password!',
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\S{8,}$/,
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
});

export default LogIn;
