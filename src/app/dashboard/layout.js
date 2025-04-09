"use client";

import React, { Suspense } from "react";
import SmallLayoutComponent from "@/components/Dashboard/SmallLayoutComponent";
import AppLoader from "@/components/Loader/AppLoader";

const Layout = ({ children }) => {
  return (
    <div className="">
      <Suspense fallback={<AppLoader />}>
        <SmallLayoutComponent>{children}</SmallLayoutComponent>
      </Suspense>
    </div>
  );
};

export default Layout;
