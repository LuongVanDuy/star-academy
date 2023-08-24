import React, { useState, type ReactElement } from "react";

import { useRouter } from "next/router";
import { NextPageWithLayout } from "../_app";
import AuthenticationWrapperAdmin from "@/layouts/wrapper/AuthenticationWrapperAdmin";

const Index: NextPageWithLayout = (props: any) => {
  const router = useRouter();

  return (
    <>
      <h1>Hello!</h1>
    </>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticationWrapperAdmin>{page}</AuthenticationWrapperAdmin>;
};

export default Index;
