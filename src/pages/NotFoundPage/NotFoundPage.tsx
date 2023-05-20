import React from "react";
import styles from "./NotFoundPage.module.scss";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>404</h2>
      <h3 className={styles.subHeading}>
        Страница не найдена
      </h3>
      <Button onClick={() => navigate("/")}>
        На главную
      </Button>
    </div>
  );
};

export default NotFoundPage;
