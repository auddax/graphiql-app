import React, { useState, useContext } from "react";
import { Button, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import styles from "./MainPage.module.scss";
import CodePlayground from "../../components/CodePlayground";
import Sidebar from "../../components/Sidebar";
import { StoreContext } from "../../store/StoreProvider";

const { Sider, Content } = Layout;

const MainPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const store = useContext(StoreContext);

  const handleRequest = () => {
    store.schemaStore.sendRequest();
  };

  return (
    <Layout className={styles["main-page"]}>
      <Sider
        trigger={null}
        theme="light"
        collapsible
        collapsed={collapsed}
        width={500}
      >
        <Button
          onClick={() => {
            setCollapsed(!collapsed);
            collapsed && handleRequest();
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        {!collapsed && <Sidebar />}
      </Sider>
      <Content className={styles["page-content"]}>
        <CodePlayground />
      </Content>
    </Layout>
  );
};

export default MainPage;
