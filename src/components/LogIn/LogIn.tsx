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
import { useNavigate } from 'react-router-dom';
import config from '../../../config.json';

const LogIn = () => {
  const store = useContext(StoreContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const locale = store.localeStore.locale;
  const { login, message } = locale === 'ru' ? config.locale.ru : config.locale.en;
  const {
    loginBtn,
    email,
    emailRuleMessageFormat,
    emailRuleMessageReq,
    password,
    passwordError,
    passwordMessage,
  } = login;

const { loginP1, loginP2 } = message;

  useEffect(() => {
    if (!store.authStore.showLoginPage) form.resetFields();
    if (store.authStore.login) form.resetFields();
  }, [store.authStore.showLoginPage, store.authStore.login]);

  const onFinish = (values: UserDataLog) => {
    store.authStore.setLogin(values).then((success) => {
      if (success) {
        store.authStore.newMessage('success', `${loginP1}, ${store.authStore.user.email}. ${loginP2}!`)
        navigate('/main');
      }
    });
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
                message: emailRuleMessageFormat,
              },
              {
                required: true,
                message: emailRuleMessageReq,
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={email}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: passwordMessage,
              },
              {
                pattern:
                  /^.*(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_])\S{8,}.*$/,
                message: passwordError,
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={password}
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
              {loginBtn}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default observer(LogIn);
