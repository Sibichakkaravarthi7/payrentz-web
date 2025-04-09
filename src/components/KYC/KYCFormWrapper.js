"use client";

import React, { useContext, useEffect, useState } from "react";
import AppImage from "../Image/AppImage";
import { LeftArrowIcon } from "@/Icons";
import Text from "../Text/Text";
import { KycContext } from "@/app/(kycLayout)/kyc/layout";

function KYCFormWrapper({ component, title, stepNumber, stepsCount }) {
  const { setStep } = useContext(KycContext);

  return (
    <div className="border rounded-[10px] my-[42px] pb-[38px] min-h-[90vh]">
      <div className="flex items-center ml-[20px] md:ml-[55px] mt-[28px] md:mt-[50px] mb-[47px]">
        {stepNumber !== 1 ? (
          <AppImage
            src={LeftArrowIcon}
            alt="left-arrow-icon"
            className="w-[20px] h-[20px] md:w-[30px] md:h-[30px] cursor-pointer"
            onClick={() => setStep("previous")}
            loading="lazy"
          />
        ) : null}
        <div className="rounded-[50%] flex justify-center items-center ml-[15px] md:ml-[30px] mr-[10px] md:mr-[20px] w-[34px] md:w-[54px] h-[34px] md:h-[54px] border-2 border-[#1D1D1D]">
          <Text className={"text-[12px] md:text-[24px] font-bold"}>
            {stepNumber}
          </Text>
          <Text className={"text-[8px] md:text-[16px] font-bold"}>
            {"/" + stepsCount}
          </Text>
        </div>
        <Text className={"text-[14px] md:text-[24px] font-bold"}>{title}</Text>
      </div>
      <div className="mx-auto flex justify-center pl-[14px] pr-[14px] md:pl-[56px] md:pr-[28px]">
        {component}
      </div>
    </div>
  );
}

export default KYCFormWrapper;
