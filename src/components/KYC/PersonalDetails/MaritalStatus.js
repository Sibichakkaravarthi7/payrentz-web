"use client";

import { MarriedIcon, SingleIcon } from "@/Icons";
import AppImage from "@/components/Image/AppImage";
import React, { useContext, useState } from "react";
import Text from "../../Text/Text";
import { KycContext } from "@/app/(kycLayout)/kyc/layout";

function MaritalStatus() {
  const { formData, setFormData, setStep, step, mutate } =
    useContext(KycContext);
  const selectedMaritalStatus = formData?.martial_status;

  const handleSelect = (val) => {
    setFormData((prv) => ({
      ...prv,
      martial_status: val?.value,
      steps_completed: step,
    }));
    // mutate({
    //   martial_status: val?.value,
    //   steps_completed: step,
    // });
    // setStep("next");
  };

  const maritalStatus = [
    {
      icon: SingleIcon,
      alt: "single-icon",
      name: "Single",
      value: "single",
    },
    {
      icon: MarriedIcon,
      alt: "married-icon",
      name: "Married",
      value: "married",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-[10px] md:gap-[16px] fade-in">
      {maritalStatus?.map((item) => (
        <div
          key={item?.name}
          className={`cursor-pointer flex flex-col w-[100px] h-[100px] md:w-[116px] md:h-[125px] items-center border hover:border-[#ED1F28] px-[18px] py-[18px] md:px-[35px] md:py-[24px] rounded-[20px] ${
            selectedMaritalStatus == item?.value ? "border-[#ED1F28]" : null
          }`}
          onClick={() => handleSelect(item)}
        >
          <AppImage
            src={item?.icon}
            className="max-w-[30px] md:max-w-[47px]"
            alt={item?.alt}
            loading="lazy"
          />
          <Text
            className={
              "text-[10px] md:text-[12px] font-bold text-[#1D1D1D] mt-[10px] md:mt-[19px]"
            }
          >
            {item?.name}
          </Text>
        </div>
      ))}
    </div>
  );
}

export default MaritalStatus;
