import React from "react";
import { Layout } from "antd";
import CodePlayground from "../../components/CodePlayground";
import SideBar from "../../components/SideBar";
import styles from "./MainPage.module.scss";

const { Content } = Layout;

const MainPage: React.FC = () => {
  return (
    <Layout className={styles["main-page"]}>
      <SideBar />
      <Content className={styles["page-content"]}>
        <CodePlayground />
      </Content>
    </Layout>
  );
};

export default MainPage;
