import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ClientLayout from "../layout/ClientLayout";
import { Spin } from "antd";
import { checkUserAndFetchData } from "@/lib/auth";

const AuthenticationWrapper = ({ children }: any) => {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [userLogin, setUserLogin] = useState<any | null>(null);
  const { setAuth } = useAuth();
  
  useEffect(() => {
    checkUserAndFetchData().then((userData) => {
      if (userData) {
        setAuthChecked(true);
        setAuth(userData);
        setUserLogin(userData)
      } else {
        router.push("/login");
      }
    });
  }, []);

  return (
    <>
      {authChecked ? (
        <ClientLayout user={userLogin}>{children}</ClientLayout>
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
};

export default AuthenticationWrapper;
