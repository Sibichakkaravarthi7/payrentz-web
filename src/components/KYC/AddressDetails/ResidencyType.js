"use client";

import { OwnHouseIcon, RentalHouseIcon } from "@/Icons";
import React, { useState, useContext } from "react";
import AppImage from "../../Image/AppImage";
import Text from "../../Text/Text";
import { KycContext } from "@/app/(kycLayout)/kyc/layout";

function ResidencyType() {
  const { formData, setFormData, setStep, step, mutate } =
    useContext(KycContext);
  const selectedResidencyType = formData?.residency_type;

  const handleSelect = (val) => {
    setFormData((prv) => ({
      ...prv,
      residency_type: val?.value,
      residency_documents: null,
      steps_completed: step,
    }));
    // mutate({
    //   residency_type: val?.value,
    //   steps_completed: step,
    // });
    // setStep("next");
  };

  const residencyType = [
    {
      icon: OwnHouseIcon,
      alt: "own-house-icon",
      name: "Own House",
      value: "own_house",
    },
    {
      icon: RentalHouseIcon,
      alt: "rental-house-icon",
      name: "Rental House",
      value: "rental_house",
    },
  ];
  return (
    <div className="grid grid-cols-3 cursor-pointer gap-[10px] md:gap-[16px] fade-in">
      {residencyType?.map((item) => (
        <div
          key={item?.name}
          onClick={() => handleSelect(item)}
          className={`flex flex-col w-[100px] h-[100px] md:w-[116px] md:h-[125px] items-center 
        border hover:border-[#ED1F28] px-[18px] py-[18px] md:px-[35px]
         md:py-[24px] rounded-[20px] ${
           selectedResidencyType == item?.value ? "border-[#ED1F28]" : null
         }`}
        >
          <AppImage
            src={item?.icon}
            className="max-w-[30px] md:max-w-[47px]"
            alt={item?.alt}
            loading="lazy"
          />
          <Text
            className={
              "text-[10px] md:text-[12px]  md:whitespace-nowrap font-bold text-[#1D1D1D] mt-[10px] md:mt-[19px] text-center"
            }
          >
            {item?.name}
          </Text>
        </div>
      ))}
    </div>
  );
}

export default ResidencyType;
