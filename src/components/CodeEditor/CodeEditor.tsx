import React, { useContext } from 'react';
import { Editor } from '@monaco-editor/react';
import styles from './CodeEditor.module.scss';
import { StoreContext } from '../../store/StoreProvider';
import { Button, Col, Row } from 'antd';
import { PlaySquareOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';

const CodeEditor: React.FC = () => {  
  const store = useContext(StoreContext);

  const handleChange = (value: string | undefined) => {
    store.editorStore.setQueryValue(value)
  }

  const handleRequest = () => {
    store.editorStore.sendRequest();
  }

  return (
    <Row className={styles['row']}>
      <Col className={styles['col']} sm={22}>
        <Editor 
          height="100%"
          language="graphql"
          value={store.editorStore.queryValue}
          onChange={handleChange}
          className={styles['editor']}
        />
      </Col>
      <Col className={styles['col']} sm={2}>
        <Button onClick={handleRequest}>
          <PlaySquareOutlined />
        </Button>
      </Col>
    </Row>
  );
};

export default observer(CodeEditor);
