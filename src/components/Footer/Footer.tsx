import React from "react";
import { Typography } from "antd";
import styles from "./Footer.module.scss";

const Footer = () => {
  const { Text } = Typography;

  return (
    <div className={styles["footer"]}>
      <div className={styles["footer-content"]}>
        <a
          href="https://github.com/auddax"
          target={"_blank"}
          className="footer-author-link"
          title="Auddax"
          rel="noreferrer"
        >
          <Text>Kirill <span className={styles.lastName}>Konovalov</span></Text>
        </a>
        <a
          href="https://github.com/hell-llex"
          target={"_blank"}
          className="footer-author-link"
          title="Hell-llex"
          rel="noreferrer"
        >
          <Text>Alexander <span className={styles.lastName}>Demeshchenko</span></Text>
        </a>
        <a
          href="https://github.com/shalick"
          target={"_blank"}
          className="footer-author-link"
          title="Shalick"
          rel="noreferrer"
        >
          <Text>Aliaksandr <span className={styles.lastName}>Shabanovich</span></Text>
        </a>
        <a
          className={styles.rssLink}
          href="https://rs.school/js/"
          target="_blank"
          title="RS School"
          rel="noreferrer"
        />
        <Text>2023</Text>
      </div>
    </div>
  );
};

export default Footer;
