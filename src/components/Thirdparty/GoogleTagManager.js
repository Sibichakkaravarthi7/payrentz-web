"use client";

import { GoogleTagManager } from "@next/third-parties/google";

const GTM = () => {
  return (
    <>
      <div>
        {process.env.NEXT_PUBLIC_NODE_ENV == "uat" ? (
          <GoogleTagManager gtmId="GTM-MHVH4BGR" />
        ) : null}
      </div>
      <div>
        {process.env.NEXT_PUBLIC_NODE_ENV == "uat" ? (
          <GoogleTagManager gtmId="GTM-MLDN7P3D" />
        ) : null}
      </div>
    </>
  );
};
export default GTM;
