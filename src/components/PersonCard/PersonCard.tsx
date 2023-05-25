import React, { useContext } from 'react';
import styles from './PersonCard.module.scss';
import { StoreContext } from '../../store/StoreProvider';
import config from '../../../config.json';

type Person = { person: 'hell-llex' | 'auddax' | 'shalick' };

const Card = ({ person }: Person) => {
  const store = useContext(StoreContext);
  const locale = store.localeStore.locale;
  const { personTeam } = locale === 'ru' ? config.locale.ru : config.locale.en;
  const { hellllex, auddax, shalick } = personTeam;

  return (
    <div className={styles['card']}>
      <div className={styles['card-content']}>
        <div className={[styles['avatar'], styles[person]].join(' ')} />
        <div className={styles['card-info']}>
          <h2>{person}</h2>
          <p>
            {person === hellllex.name
              ? hellllex.info
              : person === auddax.name
              ? auddax.info
              : person === shalick.name
              ? shalick.info
              : null}
          </p>
        </div>
      </div>
    </div>
  );
};

export { Card };
