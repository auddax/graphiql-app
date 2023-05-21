import React, { useContext } from 'react';
import { editor } from 'monaco-editor';
import { Editor } from '@monaco-editor/react';
import { StoreContext } from '../../store/StoreProvider';
import { Button, Col, Row } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import ParamsEditor from '../ParamsEditor';
import config from '../../../config.json'
import styles from './CodeEditor.module.scss';

const CodeEditor: React.FC = () => {  
  const store = useContext(StoreContext);
  const options = config.monacoEditor.options as editor.IStandaloneEditorConstructionOptions;

  const handleCodeChange = (value: string | undefined) => {
    store.editorStore.setQueryValue(value)
  }

  const handleRequest = () => {
    store.editorStore.sendRequest();
  }

  return (
    <div className={styles['code-editor']}>
      <Row className={styles['row-code-editor']}>
        <Col className={styles['col-code-editor']} sm={20}>
          <Editor 
            height="100%"
            language="graphql"
            value={store.editorStore.queryValue}
            onChange={handleCodeChange}
            className={styles['editor']}
            options={options}
          />
        </Col>
        <Col className={styles['col-code-editor']} sm={4}>
          <Button 
            type="primary" 
            onClick={handleRequest} 
            size="large"
            icon={<CaretRightOutlined />} 
          />
        </Col>
      </Row>
      <Row className={styles['row-params-editor']}>
        <Col className={styles['col-params-editor']} sm={24}>
          <ParamsEditor />
        </Col>
      </Row>
    </div>
  );
};

export default observer(CodeEditor);
