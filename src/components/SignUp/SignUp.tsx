import { StoreContext } from '../../store/StoreProvider';

import { Button, Checkbox, Form, Input } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { UserDataReg } from '../../types';
import { useNavigate } from 'react-router-dom';
import config from '../../../config.json';
import styles from './SignUp.module.scss';

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
  },
};

type LayoutType = Parameters<typeof Form>[0]['layout'];

const SignUp = () => {
  const store = useContext(StoreContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [formLayout, setFormLayout] = useState<LayoutType>('vertical');
  const locale = store.localeStore.locale;
  const { signup, message } = locale === 'ru' ? config.locale.ru : config.locale.en;
  const {
    registerBtn,
    email,
    emailRuleMessageFormat,
    emailRuleMessageReq,
    password,
    passwordTooltip,
    confirm,
    confirmError,
    confirmPassword,
    confirmPasswordError,
    confirmPasswordMessage,
    passwordMessage,
    passwordError,
  } = signup;

  const { registerP1, registerP2 } = message;

  useEffect(() => {
    if (store.authStore.showLoginPage) form.resetFields();
    if (store.authStore.login) form.resetFields();
  }, [store.authStore.showLoginPage, store.authStore.login]);

  const onFinish = (values: UserDataReg) => {
    store.authStore.setUser(values).then((success) => {
      if (success) {
        store.authStore.newMessage('success', `${registerP1}, ${store.authStore.user.email}. ${registerP2}!`)
        navigate('/main');
      }
    });
  };

  const formItemLayout =
    formLayout === 'horizontal'
      ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } }
      : null;

  return (
    <>
      <div className={styles['signup-page']}>
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{ layout: formLayout }}
          name="register"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          labelCol={{ span: 24 }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label={email}
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
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label={password}
            tooltip={passwordTooltip}
            rules={[
              {
                required: true,
                message: passwordMessage,
              },
              {
                pattern:
                  /^.*(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])\S{8,}.*$/,
                message: passwordError,
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label={confirmPassword}
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: confirmPasswordMessage,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(confirmPasswordError));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error(confirmError)),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>{confirm}</Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              {registerBtn}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default observer(SignUp);
