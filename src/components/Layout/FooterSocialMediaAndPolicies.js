"use client";
import React from "react";
import AppImage from "../Image/AppImage";
import { policeslinks, socialLink } from "@/utils/Constants";
import AppLink from "../Link/AppLink";
import Text from "../Text/Text";

const FooterSocialMediaAndPolicies = () => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-[30%_auto_auto] justify-center md:justify-between items-center border-y-[1px] border-[#dbdbdb] py-[22px] px-[5px] gap-y-[30px]">
      <div className="flex gap-[20px] md:gap-[30px] justify-center md:justify-start">
        {socialLink?.map((m) => (
          <AppLink link={m?.link} target={"_blank"} key={m?.link}>
            <AppImage src={m?.icon} className={"w-[16px]"} loading="lazy" />
          </AppLink>
        ))}
      </div>
      <Text
        className={
          "font-medium text-[10px] md:text-[14px] text-left text-center"
        }
      >{`© Copyrights ${new Date().getFullYear()} payrentz.com`}</Text>
      <div className="flex gap-[20px] md:gap-[30px]">
        {policeslinks?.map((m) => (
          <AppLink
            className={"text-[14px] md:text-[16px]"}
            target={"_blank"}
            key={m?.link}
            link={m?.link}
            text={m?.text}
          />
        ))}
      </div>
    </div>
  );
};

export default FooterSocialMediaAndPolicies;
