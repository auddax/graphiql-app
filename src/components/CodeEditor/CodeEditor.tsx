import React, { useContext } from 'react';
import { Editor } from '@monaco-editor/react';
import styles from './CodeEditor.module.scss';
import { StoreContext } from '../../store/StoreProvider';

const CodeEditor: React.FC = () => {  
  const store = useContext(StoreContext);
  const handleChange = (value: string | undefined) => {
    store.editorStore.setQueryValue(value)
  }

  return (
    <Editor 
      height="100vh"
      language="graphql"
      onChange={handleChange}
    />
  );
};

export default CodeEditor;
