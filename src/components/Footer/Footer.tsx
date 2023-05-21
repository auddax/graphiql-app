import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
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
          Kirill <span className={styles.lastName}>Konovalov</span>
        </a>
        <a
          href="https://github.com/hell-llex"
          target={"_blank"}
          className="footer-author-link"
          title="Hell-llex"
          rel="noreferrer"
        >
          Alexander <span className={styles.lastName}>Demeshchenko</span>
        </a>
        <a
          href="https://github.com/shalick"
          target={"_blank"}
          className="footer-author-link"
          title="Shalick"
          rel="noreferrer"
        >
          Aliaksandr <span className={styles.lastName}>Shabanovich</span>
        </a>
        <a
          className={styles.rssLink}
          href="https://rs.school/js/"
          target="_blank"
          title="RS School"
          rel="noreferrer"
        />
        <p>2023</p>
      </div>
    </div>
  );
};

export default Footer;
