import { useState, type ReactElement, useEffect } from "react";
import type { NextPageWithLayout } from "./_app";
import AuthLayout from "@/layouts/layout/AuthLayout";
import { Space, Form, Button, Typography, message } from "antd";
import FormInput from "@/components/form/input";
import Head from "next/head";
import FormPassword from "@/components/form/password";
import { browserLocalPersistence, browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/router";

const { Title } = Typography;

const buttonWrapper = {
  offset: 0,
  span: 24,
};

const formWrapper = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  
  const onFinish = (value: any) => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, value!.email, value!.password);
      })
      .then((userCredential) => {
        router.push("/");
      })
      .catch((error) => {
        messageApi.error({
          content: "Đăng nhập không thành công",
        });
        console.log("[ERROR] signInWithEmailAndPassword: ", error);
      });
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {contextHolder}
      <Space className="form-wrapper">
        <div>
          <Title style={{ marginTop: 0, marginBottom: "25px" }} level={4}>
            STAR ACEDEMY
          </Title>
          <Form
            {...formWrapper}
            name="form_login"
            style={{ maxWidth: 400 }}
            onFinish={onFinish} 
            autoComplete="off"
          >
            <FormInput
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            />
            <FormPassword
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            />
            <Form.Item wrapperCol={buttonWrapper}>
              <Button block type="primary" htmlType="submit">
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Space>
    </>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Login;
