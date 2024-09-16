import {
  adminSidebarItems,
  userSidebarItems,
} from "@/constant/sidebarItems.constant";
import { Button, Layout, Menu } from "antd";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./slidebar.css";
import useUserInfoFromToken from "@/hook/useUserInfoFromToken";

const { Sider } = Layout;

const AntSidebar = () => {
  const location = useLocation();
  const currentPathName = location?.pathname;
  const currentSelectedItem =
    currentPathName.split("/")[currentPathName.split("/").length - 1];
  const userInfo = useUserInfoFromToken();
  const [collapsed, setCollapsed] = useState(false);
  const sidebarItems =
    userInfo?.role === "user" ? userSidebarItems : adminSidebarItems;

  return (
    <Layout
      style={{
        minHeight: "100vh",
        position: "sticky",
        top: 0,
      }}
      id="deshboard-slider"
      className={collapsed ? "mini-slider" : ""}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <NavLink to={"/home"}>
          <Button type="text" id="sidebar-icon">
            <span>
              Q<span className={`${collapsed ? "hidden" : ""}`}>Meet</span>
            </span>
          </Button>
        </NavLink>

        <Menu
          theme="dark"
          defaultSelectedKeys={[currentSelectedItem]}
          mode="inline"
          items={sidebarItems}
        />
      </Sider>
    </Layout>
  );
};

export default AntSidebar;
