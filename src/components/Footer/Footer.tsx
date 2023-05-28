import React, { useContext } from 'react';
import styles from './Footer.module.scss';
import { Button, Popover, Space, Typography } from 'antd';
import { StoreContext } from '../../store/StoreProvider';
import config from '../../../config.json';
import { observer } from 'mobx-react-lite';

const { Text } = Typography;

const content = (
  <Space
    wrap
    direction="vertical"
    size="small"
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <a
      href="https://github.com/auddax"
      target={'_blank'}
      title="Auddax"
      rel="noreferrer"
    >
      Kirill Konovalov
    </a>
    <a
      href="https://github.com/hell-llex"
      target={'_blank'}
      title="Hell-llex"
      rel="noreferrer"
    >
      Alexander Demeshchenko
    </a>
    <a
      href="https://github.com/shalick"
      target={'_blank'}
      title="Shalick"
      rel="noreferrer"
    >
      Aliaksandr Shabanovich
    </a>
  </Space>
);

const Footer = () => {
  const store = useContext(StoreContext);
  const locale = store.localeStore.locale;
  const { welcomePage } = locale === 'ru' ? config.locale.ru : config.locale.en;
  const { titleAbout } = welcomePage;
  return (
    <div className={styles['footer']}>
      <div className={styles['footer-content']}>
        <Space className={styles['team-desktop']}>
          <Button href="https://github.com/auddax" title="Auddax" type="link">
            Kirill<br />Konovalov
          </Button>
          <Button
            href="https://github.com/hell-llex"
            title="Hell-llex"
            type="link"
          >
            Alexander<br />Demeshchenko
          </Button>
          <Button href="https://github.com/shalick" title="Shalick" type="link">
            Aliaksandr<br />Shabanovich
          </Button>
        </Space>
        <div className={styles['content-year']}>
          <Text>© 2023</Text>
        </div>
        <Popover
          content={content}
          trigger="click"
          title="GraphiQL on React © 2023"
          className={styles['team-mobile']}
        >
          <Button type='text'>{titleAbout}</Button>
        </Popover>
        <div className={styles['content-logo']}>
          <a
            className={styles.rssLink}
            href="https://rs.school/react/"
            target="_blank"
            title="RS School"
            rel="noreferrer"
          />
        </div>
      </div>
    </div>
  );
};

export default observer(Footer);
