import React, { useContext } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import { Breadcrumb, Col, Row, Spin, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import styles from "./SchemaViewer.module.scss";
import { InfoCircleOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const SchemaViewerType =() => {
  const store = useContext(StoreContext);
  const isLoading = store.schemaStore.isLoading;
  const fields = store.schemaStore.getTypes;
  const title = store.schemaStore.getSchemaTypeName;

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
            title: title 
          }
        ]
      } />
      <Title level={3} style={{color: '#595959'}}>{title}</Title>
      <Paragraph className={styles['subtitle']}>
        <InfoCircleOutlined />&nbsp;Fields:
      </Paragraph>
      <Spin spinning={isLoading} wrapperClassName={styles['viewer-spinner']}>
        {fields && fields.length > 0 && fields.map(field => (
          <Row key={field.name}>
            <Col>
              <Text className={styles['field']}>{field.name}:&nbsp;</Text>
              <Text className={styles['type']}>{field.type.name}</Text>
              <Paragraph style={{color: '#595959'}}>{field.description}</Paragraph>
            </Col>
          </Row>
        ))}
      </Spin>
    </Col>
  );
};

export default observer(SchemaViewerType);
