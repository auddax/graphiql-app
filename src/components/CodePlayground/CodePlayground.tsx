import React, { useContext } from 'react';
import styles from './CodePlayground.module.scss';
import { Col, Row } from 'antd';
import CodeEditor from '../CodeEditor';
import ResponseViewer from '../ResponseViewer';

const CodePlayground = () => {
  return (
    <Row className={styles['code-playground']} gutter={[8, 8]}>
      <Col className={styles['code-editor']} sm={24} lg={12}>
        <CodeEditor />
      </Col>
      <Col sm={24} lg={12}>
        <ResponseViewer />
      </Col>
    </Row>
  );
};

export default CodePlayground;
