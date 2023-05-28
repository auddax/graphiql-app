import React, { useContext } from 'react';
import styles from './PersonCard.module.scss';

const Card = ({
  personInfo,
}: {
  personInfo: { name: string; info: string };
}) => {
  return (
    <div className={styles['card']}>
      <div className={styles['card-content']}>
        <div
          className={[styles['avatar'], styles[personInfo.name]].join(' ')}
        />
        <div className={styles['card-info']}>
          <h2>{personInfo.name}</h2>
          <p>{personInfo.info}</p>
        </div>
      </div>
    </div>
  );
};

export { Card };
