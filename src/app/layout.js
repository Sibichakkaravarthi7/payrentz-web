import "./globals.css";
import "./style.css";
import "./quill.css";
import ReactQueryProvider from "./ReactQueryProvider";
import NextTopLoader from "nextjs-toploader";
import GTM from "@/components/Thirdparty/GoogleTagManager";
import GA4 from "@/components/Thirdparty/GoogleAnalytics";
import { Raleway } from "next/font/google";
import MetaPixel from "@/components/Thirdparty/MetaPixel";
import AppImage from "@/components/Image/AppImage";
import Script from "next/script";
// export const metadata = {
//   title:
//     "Rent Smart with Payrentz: ACs, Appliances, Furniture, Laptops, and More in Chennai and Coimbatore",
//   description:
//     "Discover convenient and affordable rentals in Chennai and Coimbatore for ACs, home appliances, furniture, laptops, and cycles. Rent top-quality items like fridges, washing machines, furniture, and TVs hassle-free from Payrentz.",
//   alternates: {
//     canonical: "https://www.payrentz.com",
//   },
// };
const raleway = Raleway({
  weight: ["400", "500", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <Script
          id="hotjar-script"
          // strategy="afterInteractivity"
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
        /> */}

      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="preload" href="./globals.css" />
        <link rel="preload" href="./style.css" />
        <link rel="preload" href="./quill.css" />

        {/* <meta
          name="description"
          content="Discover convenient and affordable rentals in Chennai and Coimbatore for ACs, home appliances, furniture, laptops, and cycles. Rent top-quality items like fridges, washing machines, furniture, and TVs hassle-free from Payrentz."
        /> */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Rent Smart with Payrentz" />
        <meta
          property="og:description"
          content="Discover convenient and affordable rentals in Chennai and Coimbatore for ACs, home appliances, furniture, laptops, and cycles. Rent top-quality items like fridges, washing machines, furniture, and TVs hassle-free from Payrentz."
        />
      </head>

      <body className={raleway.className}>
        <NextTopLoader
          showSpinner={false}
          color="#2b5cab"
          startPosition={0.3}
          stopPosition={0.9}
        />
        <ReactQueryProvider>{children}</ReactQueryProvider>
        {/* Facebook Pixel Script */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !(function (f, b, e, v, n, t, s) {
              if (f.fbq) return;
              n = f.fbq = function () {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
              };
              if (!f._fbq) f._fbq = n;
              n.push = n;
              n.loaded = !0;
              n.version = "2.0";
              n.queue = [];
              t = b.createElement(e);
              t.async = !0;
              t.src = v;
              s = b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t, s);
            })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

            fbq("init", "1490357154994264");
            fbq("track", "PageView");
          `}
        </Script>
        {/* ms clarity code */}
        <Script
          id="ms-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "qdbbojnzhc");
          `,
          }}
        />

        {/* <!-- GTM Tracking Code for https://www.payrentz.com/ --> */}
        <GTM />
        {/* <!-- GA4 Tracking for https://www.payrentz.com/ --> */}
        <GA4 />
        {/* <!-- Meta Pixel Code  for https://www.payrentz.com/ --> */}
        {/* <MetaPixel /> */}
        {/* <!-- Hotjar Tracking Code for https://www.payrentz.com/ --> */}
        {/* <HotjarComp /> */}
        {/* NoScript Fallback */}
        <noscript>
          <AppImage
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1490357154994264&ev=PageView&noscript=1"
            alt="Facebook Pixel"
          />
        </noscript>
      </body>
    </html>
  );
}
