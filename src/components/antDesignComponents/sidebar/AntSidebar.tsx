import { adminSidebarItems } from "@/constant/sidebarItems.constant";
import { Button, Layout, Menu } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./slidebar.css";
import useUserInfoFromToken from "@/hook/useUserInfoFromToken";

const { Sider } = Layout;

const AntSidebar = () => {
  const userInfo = useUserInfoFromToken();
  const [collapsed, setCollapsed] = useState(false);
  const items =
    userInfo?.role === "user" ? adminSidebarItems : adminSidebarItems;

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
        <NavLink to={"/"}>
          <Button type="text" id="sidebar-icon">
            <span>
              Q<span className={`${collapsed ? "hidden" : ""}`}>Meet</span>
            </span>
          </Button>
        </NavLink>

        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
    </Layout>
  );
};

export default AntSidebar;
