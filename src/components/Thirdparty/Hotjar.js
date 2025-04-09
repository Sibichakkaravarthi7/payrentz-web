"use client";

// import { useEffect } from "react";
// import Hotjar from "@hotjar/browser";

// const siteId = 3927204;
// const hotjarVersion = 6;

const HotjarComp = () => {
  // useEffect(()=>{
  //   Hotjar.init(siteId, hotjarVersion);
  // },[])
  return (
    <div>
      {/* {process.env.NEXT_PUBLIC_NODE_ENV == "uat" ? (
        <Script
          id="hotjar-script"
          strategy="afterInteractivity"
          dangerouslySetInnerHTML={{
            __html: `(function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3927204,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
          }}
        />
      ) : null} */}
    </div>
  );
};
export default HotjarComp;
