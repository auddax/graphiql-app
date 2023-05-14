import React, { useContext } from 'react';
import { Typography } from 'antd';
import { StoreContext } from '../../store/StoreProvider';
import { observer } from 'mobx-react-lite';
import styles from './ResponseViewer.module.scss';
import { toJS } from 'mobx';

const ResponseViewer = () => {
  const store = useContext(StoreContext);
  const { Text, Paragraph} = Typography;
  const response = store.editorStore.responseData;
  
  return (
    <div className={styles['response-viewer']}>
      <pre>{JSON.stringify(response, null, 4)}</pre>
    </div>
  );
};

export default observer(ResponseViewer);
