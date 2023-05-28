import React, { useContext } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import { Col, Typography, Breadcrumb } from 'antd';
import { observer } from 'mobx-react-lite';
import styles from "./SchemaViewer.module.scss";
import { InfoCircleOutlined, LeftOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const SchemaViewerField = () => {
  const store = useContext(StoreContext);
  const fields = store.schemaStore.getFields;
  const fieldName = store.schemaStore.getSchemaFieldName;
  const currentField = fields.find(x => x.name === fieldName);

  const handleTypeClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const name = target.textContent;
    if (name) {
      store.schemaStore.setSchemaТypeName(name);
      store.schemaStore.requestType();
      store.schemaStore.setSchemaView('type');
    }
  }

  return (
    <Col>
      <Breadcrumb items={
        [
          { 
            title: 'Docs', 
            onClick: () => store.schemaStore.setSchemaView('root'), 
            className: styles['bc-item']
          },
          { 
            title: 'Query',
            onClick: () => store.schemaStore.setSchemaView('fields'), 
            className: styles['bc-item']
          },
          {
            title: currentField?.name
          }
        ]
      } />
      <Title level={4} style={{color: '#595959'}}>{currentField?.name}</Title>
      <Paragraph className={styles['subtitle']}>
        <InfoCircleOutlined />&nbsp;Type:
      </Paragraph>
      <Paragraph>
        <Text onClick={(e) => handleTypeClick(e)} className={styles['type-link']}>{currentField?.type?.name}</Text>
      </Paragraph>
      <Paragraph className={styles['subtitle']}>
        <InfoCircleOutlined />&nbsp;Args:
      </Paragraph>
      {currentField?.args.map(arg => <Paragraph key={arg.name} style={{color: '#ff4d4f'}}>{arg.name}</Paragraph> )}
    </Col>
  );
};

export default observer(SchemaViewerField);
