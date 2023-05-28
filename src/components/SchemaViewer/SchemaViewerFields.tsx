import React, { useContext } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import { Col, Row, Typography, Breadcrumb } from 'antd';
import { observer } from 'mobx-react-lite';
import styles from "./SchemaViewer.module.scss";
import { InfoCircleOutlined, LeftOutlined } from '@ant-design/icons';
import { toJS } from 'mobx';

const { Title, Text, Paragraph } = Typography;

const SchemaViewerFields = () => {
  const store = useContext(StoreContext);
  const fields = store.schemaStore.getFields;

  const handleTypeClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const name = target.textContent;
    if (name) {
      store.schemaStore.setSchemaТypeName(name);
      store.schemaStore.requestType();
      store.schemaStore.setSchemaView('type');
    }
  }

  const handleFieldClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const name = target.textContent;
    if (name) {
      store.schemaStore.setSchemaFieldName(name);
      store.schemaStore.setSchemaView('field');
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
          }
        ]
      } />
      <Title level={4} style={{color: '#595959'}}>Query</Title>
      <Paragraph className={styles['subtitle']}>
        <InfoCircleOutlined />&nbsp;Fields:
      </Paragraph>
      {fields && fields.length > 0 && fields.map(field => (
        <Row key={field.name}>
          <Text onClick={(e) => handleFieldClick(e)} className={styles['field-link']}>
            {field.name}
          </Text>
          <Text style={{color: '#595959'}}>({field.args.map(arg => <span key={arg.name}> {arg.name} </span>)})</Text>
          <>
           {field.type.name && (
            <>
              <Text>:&nbsp;</Text>
              <Text onClick={(e) => handleTypeClick(e)} className={styles['type-link']}>{field.type.name}</Text>
            </>
            )}
          </>
          <Paragraph style={{color: '#595959'}}>{field.description}</Paragraph>
        </Row>
      ))}
    </Col>
  );
};

export default observer(SchemaViewerFields);
