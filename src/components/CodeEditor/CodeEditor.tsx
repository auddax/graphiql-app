import React, { useContext } from 'react';
import { Editor } from '@monaco-editor/react';
import styles from './CodeEditor.module.scss';
import { StoreContext } from '../../store/StoreProvider';
import { Button, Col, Row } from 'antd';
import { PlaySquareOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import ParamsEditor from '../ParamsEditor';

const CodeEditor: React.FC = () => {  
  const store = useContext(StoreContext);

  const handleCodeChange = (value: string | undefined) => {
    store.editorStore.setQueryValue(value)
  }

  const handleRequest = () => {
    store.editorStore.sendRequest();
  }

  return (
    <>
      <Row className={styles['row-code-editor']}>
        <Col className={styles['col-code-editor']} sm={22}>
          <Editor 
            height="100%"
            language="graphql"
            value={store.editorStore.queryValue}
            onChange={handleCodeChange}
            className={styles['editor']}
            options={{ 
              minimap: { enabled: false },
              renderLineHighlight: "none",
              scrollbar: { 
                verticalScrollbarSize: 0,
              }
            }}
          />
        </Col>
        <Col className={styles['col-code-editor']} sm={2}>
          <Button onClick={handleRequest}>
            <PlaySquareOutlined />
          </Button>
        </Col>
      </Row>
      <Row className={styles['row-params-editor']}>
        <Col className={styles['col-params-editor']} sm={24}>
          <ParamsEditor />
        </Col>
      </Row>
    </>
  );
};

export default observer(CodeEditor);
