import React from "react";
import { Layout, Dropdown, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

const CustomHeader = ({
  userName,
  handleMenuClick,
  colorBgContainer,
  items,
}: Props) => {
  
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Header
      style={{ padding: 0, background: colorBgContainer, position: "relative" }}
    >
      <div style={{ position: "absolute", top: 0, right: "15px" }}>
        <span style={{ marginRight: "8px", fontWeight: 700 }}>{userName}</span>
        <Dropdown menu={menuProps} placement="bottomRight" arrow>
          <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
        </Dropdown>
      </div>
    </Header>
  );
};

type Props = {
  colorBgContainer: string;
  handleMenuClick: any;
  userName: string;
  items: any;
};

export default CustomHeader;
