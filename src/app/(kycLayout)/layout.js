import KycHeader from "@/components/KYC/Header/KycHeader";
import Footer from "@/components/Layout/Footer";
import Layout from "@/components/Layout/Layout";
import AppToast from "@/components/Toast/AppToast";
import Script from "next/script";
import React from "react";

const layout = ({ children }) => {
  return (
    <>
    <Script
        strategy="lazyOnload"
        id="whatsappgallabox-script"
        dangerouslySetInnerHTML={{
          __html: ` (function (w, d, s, u) {
    w.gbwawc = {
    url: u,
    options: {
            waId: "+91 8754486818",
            siteName: "payrentz",
            siteTag: "Usually replies in 2 hrs",
            siteLogo: "https://www.payrentz.com/_next/static/media/payrentz-logo.5c7f17d4.svg",
            widgetPosition: "RIGHT",
            triggerMessage: "",
            welcomeMessage: "Welcome to payrentz!",
            brandColor: "#25D366",
            messageText: "",
            replyOptions: ['Appliances','Furniture','Packages'],
        },
    };
    var h = d.getElementsByTagName(s)[0],
    j = d.createElement(s);
    j.async = true;
    j.src = u + "/whatsapp-widget.min.js?_=" + Math.random();
    h.parentNode.insertBefore(j, h);
    })(window, document, "script", "https://waw.gallabox.com");`,
        }}
      />
      <KycHeader />
      <AppToast />
      {children}
      <Footer />
    </>
  );
};

export default layout;
