"use client";
import React from "react";
import Text from "../Text/Text";
import AppLink from "../Link/AppLink";
import { footerLinks } from "@/utils/Constants";
import { usePathname } from "next/navigation";
import { getCookie } from "cookies-next";
import useAppStore from "@/Store/Store";

const FooterLinks = ({ categories }) => {
  const { city } = useAppStore();
  const pathname = usePathname();
  const cleanPathname = pathname?.split("/").filter(Boolean)[0] || "";
  const links = categories?.map((m) => {
    return {
      text: "Rent " + m?.identity,
      link: `/${city?.toLowerCase()}` + "/" + (m?.slug?.toString() || ""),
    };
  });

  links?.push({
    text: "Rent Packages",
    link: `/${city?.toLowerCase()}` + "/combo",
  });

  const footerLinks = [
    {
      title: "Company",
      links: [
        {
          text: "Home",
          link: `/${city?.toLowerCase()}`,
        },
        {
          text: "About Us",
          link: "/about-us",
        },
        {
          text: "Blog",
          link: "/blogs",
        },
        {
          text: "FAQs",
          link: "/faq",
        },
        {
          text: "Sitemap",
          link: "/sitemap",
        },
      ],
    },
    {
      title: "Categories",
      links: links,
    },
  ];

  // console.log("categoriesssss", categories);

  return (
    <div>
      <div className="flex gap-x-[40px] md:gap-x-[150px] justify-center ">
        {footerLinks?.map((m) => (
          <div key={m?.title}>
            <Text
              className={
                "font-bold mb-[25px] text-[18px] md:text-[20px] text-center md:text-left"
              }
            >
              {m?.title}
            </Text>
            <div className="grid grid-cols-[1] md:grid-cols-2 gap-y-[20px] gap-x-[36px] text-center md:text-left">
              {m?.links?.map((l) => (
                <AppLink
                  className={"text-[14px] md:text-[16px]"}
                  key={l?.link}
                  link={l?.link}
                  text={l?.text}
                />
              ))}
              {/* <AppLink
                className={"text-[14px] md:text-[16px]"}
                link={"/combo"}
                text={"Rent Packages"}
              /> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterLinks;
