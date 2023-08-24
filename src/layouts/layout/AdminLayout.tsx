import React from "react";
import { Provider } from "react-redux";
import { Layout, MenuProps, theme } from "antd";
import CustomHeader from "../template/CustomHeader";
import { useRouter } from "next/router";
import LogoDashBoard from "@/components/logo";
import { store } from "@/store/store";
import { auth } from "@/config/firebase";
import CustomMenu from "../template/CustomMenu";

const { Content, Footer, Sider } = Layout;
const AdminLayout = ({ children, user }: Props) => {
  const router = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Profile",
    },
    {
      key: "2",
      label: "Đăng xuất",
    },
  ];

  const onLogoutClicked = async () => {
    await auth.signOut();
    router.push("/login");
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "1") {
      router.push("/");
    } else {
      onLogoutClicked();
    }
  };

  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <LogoDashBoard path={"/admin"} />
        <CustomMenu />
      </Sider>
      <Layout>
        <CustomHeader
          userName={user.email}
          handleMenuClick={handleMenuClick}
          colorBgContainer={colorBgContainer}
          items={items}
        />
        <Provider store={store}>
          <Content
            style={{
              margin: "10px 0 0",
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              {children}
            </div>
          </Content>
        </Provider>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by DuyLV
        </Footer>
      </Layout>
    </Layout>
  );
};

type Props = {
  children: JSX.Element;
  user: any;
};

export default AdminLayout;
