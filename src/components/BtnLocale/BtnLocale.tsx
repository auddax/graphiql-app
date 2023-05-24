import React, { useContext } from "react";
import { StoreContext } from '../../store/StoreProvider';
import { Radio, RadioChangeEvent } from "antd";
import { observer } from "mobx-react-lite";
import styles from "./BtnLocale.module.scss";

const BtnLocale: React.FC = () => {
  const store = useContext(StoreContext);
  const changeLocale = (e: RadioChangeEvent) => {
    const localeValue = e.target.value;
    store.localeStore.setLocale(localeValue);
  };

  return (
    <>
      <Radio.Group 
        className={styles['btn-locale']} 
        value={store.localeStore.locale} 
        onChange={changeLocale}
      >
        <Radio.Button value="ru">
          Ru
        </Radio.Button>
        <Radio.Button value="en">
          En
        </Radio.Button>
      </Radio.Group>
    </>
  );
};

export default observer(BtnLocale);
