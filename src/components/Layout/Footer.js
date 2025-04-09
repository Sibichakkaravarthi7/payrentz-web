"use client";
import React from "react";
import AppImage from "../Image/AppImage";
import { MailIcon, PhoneIcon } from "@/Icons";
import Text from "../Text/Text";
import {
  errorPagehandler,
  payrentzEmail,
  payrentzPhoneNumber,
} from "@/utils/Constants";
import FooterLinks from "./FooterLinks";
import AppContainer from "../Container/AppContainer";
import FooterSocialMediaAndPolicies from "./FooterSocialMediaAndPolicies";
import { getHostAPIUrl } from "@/appConfig";
import { NAVIGATION_META_URL } from "@/api/urls/urls";
import FooterDynamicPath from "./FooterDynamicPath";
import makeGetRequest from "@/utils/makeGetRequest";
import { useQuery } from "react-query";

export default function Footer() {
  const { data: navigation, isLoading: navigationIsLoading } = useQuery(
    [NAVIGATION_META_URL],
    () => makeGetRequest(NAVIGATION_META_URL)
  );
  const footerData = navigation;

  return (
    <div className="bg-[#2D2D2D] text-white mt-[50px] py-[50px]">
      <AppContainer>
        <div className="flex flex-col  md:flex-row gap-x-[150px] mb-[30px]">
          <div className="flex items-center md:items-start flex-col mb-[68px] md:mb- gap-y-[20px] gap-x-[150px] md:flex-row">
            <div className="flex items-center justify-center h-full">
              <FooterDynamicPath />
            </div>
            <div>
              <Text
                className={
                  "text-[16px] md:text-[20px] font-bold text-center md:text-left"
                }
              >
                Contact Us
              </Text>
              <div className="flex flex-col gap-[24px] mt-[28px] items-center md:items-start">
                <div className="flex gap-[16px]">
                  <AppImage src={MailIcon} alt={"MailIcon"} />
                  <Text className={"text-[16px] md:text-[18px]"}>
                    {payrentzEmail}
                  </Text>
                </div>
                <div className="flex gap-[16px]">
                  <AppImage src={PhoneIcon} alt="PhoneIcon" />
                  <Text>{payrentzPhoneNumber}</Text>
                </div>
              </div>
            </div>
          </div>

          <FooterLinks categories={footerData?.data?.categories} />
        </div>
        <FooterSocialMediaAndPolicies />
        {/* <div className=" mt-[20px]">
          <Text
            className={"font-medium text-[10px] md:text-[14px] text-left text-center"}
          >{`© Copyrights ${new Date().getFullYear()} Payrentz.com`}</Text>
        </div> */}
      </AppContainer>
    </div>
  );
}
