import React, { useContext } from 'react';
import { Row } from 'antd';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../store/StoreProvider';
import SchemaViewerRoot from './SchemaViewerRoot';
import SchemaViewerFields from './SchemaViewerFields';
import SchemaViewerField from './SchemaViewerField';
import SchemaViewerType from './SchemaViewerType';
import styles from "./SchemaViewer.module.scss";

const SchemaViewer = () => {
  const store = useContext(StoreContext);
  const { schemaView } = store.schemaStore;

  return (
    <Row className={styles['schema-viewer']}>
      {schemaView === 'root' && <SchemaViewerRoot />} 
      {schemaView === 'fields' && <SchemaViewerFields />}
      {schemaView === 'field' && <SchemaViewerField />}
      {schemaView === 'type' &&  <SchemaViewerType />}
    </Row>
  );
};

export default observer(SchemaViewer);
