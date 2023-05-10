import React, { useContext } from 'react';
import styles from './CodePlayground.module.scss';
import Layout from 'antd/es/layout/layout';
import { Col } from 'antd';
import CodeEditor from '../CodeEditor';

const CodePlayground = () => {
  return (
    <Layout>
      <Col>
        <CodeEditor />
      </Col>
      <Col></Col>
    </Layout>
  );
};

export default CodePlayground;
