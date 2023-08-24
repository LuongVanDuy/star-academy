/** @format */

import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { useRouter } from "next/router";
import AdminLayout from "../layout/AdminLayout";
import { useAuth } from "../context/AuthContext";
import { checkUserAndFetchData } from "@/lib/auth";
import { UserType } from "@/types/user";



const AuthenticationWrapperAdmin = ({ children }: any) => {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [userLogin, setUserLogin] = useState<any | null>(null);
  const { setAuth } = useAuth();
  
  useEffect(() => {
    checkUserAndFetchData().then((userData: any) => {
      if (userData && userData.type === UserType.SYSTEM) {
        setAuthChecked(true);
        setAuth(userData);
        setUserLogin(userData)
      } else {
        router.push("/");
      }
    });
  }, []);

  return (
    <>
      {authChecked ? (
        <AdminLayout user={userLogin}>{children}</AdminLayout>
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

export default AuthenticationWrapperAdmin;
