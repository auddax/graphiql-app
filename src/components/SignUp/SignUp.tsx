import styles from './SignUp.module.scss';
import { StoreContext } from '../../store/StoreProvider';

import { Button, Checkbox, Form, Input } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { UserDataReg } from '../../types';
import { useNavigate } from 'react-router-dom';

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

  useEffect(() => {
    if (store.authStore.showLoginPage) form.resetFields();
    if (store.authStore.login) form.resetFields();
  }, [store.authStore.showLoginPage, store.authStore.login]);

  const onFinish = (values: UserDataReg) => {
    console.log('Received values', values);

    store.authStore.setUser(values).then((success) => {
      if (success) {
        navigate('/auth/login');
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
            label="E-mail"
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
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            tooltip="The password must be at least 8 characters, one number, one capital letter and contain no spaces."
            rules={[
              {
                required: true,
                message: 'Please input your valid password!',
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\S{8,}$/,
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
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
                    : Promise.reject(
                        new Error('To register, you have to give consent.')
                      ),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>I agree to the processing of my personal data</Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default observer(SignUp);
