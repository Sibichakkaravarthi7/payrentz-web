"use client";

import { GoogleAnalytics } from "@next/third-parties/google";

const GA4 = () => {
  return (
    <div>
      {process.env.NEXT_PUBLIC_NODE_ENV == "uat" ? (
        <GoogleAnalytics gaId="G-32BELTXM2G" />
      ) : null}
    </div>
  );
};
export default GA4;
