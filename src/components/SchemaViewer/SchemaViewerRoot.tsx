import React, { useContext } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import { Col, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import config from '../../../config.json';
import styles from "./SchemaViewer.module.scss";
import { PlusCircleOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const SchemaViewerRoot = () => {
  const store = useContext(StoreContext);
  const locale = store.localeStore.locale;
  const { schemaViewer } = locale === 'ru' ? config.locale.ru : config.locale.en;
  const { title, description, subtitle } = schemaViewer;

  const handleClick = () => {
    store.schemaStore.setSchemaView('fields');
  }

  return (
    <Col>
      <Title level={3} style={{color: '#595959'}}>{title}</Title>
      <Paragraph style={{color: '#595959'}}>{description}</Paragraph>
      <Paragraph className={styles['subtitle']}>
        <PlusCircleOutlined />&nbsp;{subtitle}
      </Paragraph>
      <Text className={styles['field-link']}>Query: </Text>
      <Text onClick={handleClick} className={styles['type-link']}>query</Text>
    </Col>
  );
};

export default observer(SchemaViewerRoot);
