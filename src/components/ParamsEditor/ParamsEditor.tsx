import React, { useContext, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { Button, Row } from 'antd';
import { StoreContext } from '../../store/StoreProvider';
import { observer } from 'mobx-react-lite';
import styles from './ParamsEditor.module.scss';

interface IPaths {
  [index: string]: {
    name: string;
    language: string;
    value: string | undefined;
  };
}

const ParamsEditor = () => {
  const store = useContext(StoreContext);
  const [mode, setMode] = useState('variables');

  const paths: IPaths = {
    headers: {
      name: 'headers',
      language: 'json',
      value: store.editorStore.headersValue,
    },
    variables: {
      name: 'variables',
      language: 'json',
      value: store.editorStore.variablesValue,
    }
  }

  const handleModeButton = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    if (target && target.id) setMode(target.id);
  }

  const handleParamsChange = (value: string | undefined) => {
    switch(mode) {
      case 'variables':
        store.editorStore.setVariablesValue(value);
        break;
      case 'headers':
        store.editorStore.setHeadersValue(value);
        break;
      default:
        return;
    }
  }

  return (
    <>
      <Row className={styles['params-editor-menu']}>
        <Button type="text" id="variables" onClick={handleModeButton}>Variables</Button>
        <Button type="text" id="headers" onClick={handleModeButton}>Headers</Button>
      </Row>
      <Row className={styles['params-editor']}>
        <Editor 
          height="100%"
          language={paths[mode].language}
          onChange={handleParamsChange}
          value={paths[mode].value}
          path={paths[mode].name}
          className={styles['editor']}
          options={{ 
            minimap: { enabled: false },
            renderLineHighlight: "none",
            scrollbar: { 
              verticalScrollbarSize: 0,
            }
          }}
        />
      </Row>
    </>
  );
};

export default observer(ParamsEditor);
