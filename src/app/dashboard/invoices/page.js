import Invoices from "@/components/Dashboard/Invoices/Invoices";
import AppLoader from "@/components/Loader/AppLoader";
import React, { Suspense } from "react";

function page() {
  return (
    <div>
      <Suspense fallback={<AppLoader />}>
        <Invoices />
      </Suspense>
    </div>
  );
}

export default page;
