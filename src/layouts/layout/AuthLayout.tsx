/** @format */

import { checkUserAndFetchData } from "@/lib/auth";
import { Layout as AntdLayout, Spin } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const { Content } = AntdLayout;

const contentStyle: React.CSSProperties = {
  textAlign: "center",
};

function AuthLayout({ children }: Props) {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  
  useEffect(() => {
    checkUserAndFetchData().then((userData) => {
      if (userData) {
        router.push("/");
      } else {
        setAuthChecked(true);
      }
    });
  }, []);
  
  return (
    <>
      {authChecked ? (
         <AntdLayout className="default">
         <Content style={contentStyle}>{children}</Content>
       </AntdLayout>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin size="large" />
        </div>
      )}
    </>
  );
  
}

type Props = {
  children: JSX.Element;
};

export default AuthLayout;
