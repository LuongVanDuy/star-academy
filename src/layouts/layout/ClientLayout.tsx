import React from "react";
import { Layout, MenuProps, theme } from "antd";
import CustomHeader from "../template/CustomHeader";
import { useRouter } from "next/router";
import { auth } from "@/config/firebase";
import { UserType } from "@/types/user";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const { Content } = Layout;

const ClientLayout = ({ children, user }: Props) => {
  const router = useRouter();
  
  const showLayoutAdmin = user.type === UserType.SYSTEM
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Profile",
    },
    showLayoutAdmin
    ? {
        key: "2",
        label: "Admin",
      }
    : null,
    {
      key: "3",
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
    }else if (e.key === "2") {
      router.push("/admin");
    }else {
      onLogoutClicked();
    }
  };

  return (
    <Layout>
      <Layout>
        <CustomHeader
          userName={user.email}
          handleMenuClick={handleMenuClick}
          colorBgContainer={colorBgContainer}
          items={items}
        />
        <Provider store={store}>
          <Content style={{ margin: "10px 0 0" }}>
            <div style={{padding: "10px 20px 10px 20px", minHeight: 360, background: colorBgContainer }}>
              {children}
            </div>
          </Content>
        </Provider>
      </Layout>
    </Layout>
  );
};

type Props = {
  children: JSX.Element;
  user: any;
};

export default ClientLayout;
