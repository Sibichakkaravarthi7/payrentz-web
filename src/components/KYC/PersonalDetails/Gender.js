"use client";

import { FemaleIcon, MaleIcon } from "@/Icons";
import React, { useContext, useState } from "react";
import AppImage from "../../Image/AppImage";
import Text from "../../Text/Text";
import { KycContext } from "@/app/(kycLayout)/kyc/layout";

function Gender({}) {
  const { formData, setFormData, setStep, step, mutate } =
    useContext(KycContext);
  const selectedGender = formData?.gender;

  const handleGenderSelect = (val) => {
    setFormData((prv) => ({
      ...prv,
      gender: val?.value,
      steps_completed: step,
    }));
    // mutate({
    //   gender: val?.value,
    //   steps_completed: step,
    // });
    // setStep("next");
  };

  const gender = [
    {
      icon: MaleIcon,
      alt: "male-icon",
      name: "Male",
      value: "male",
    },
    {
      icon: FemaleIcon,
      alt: "female-icon",
      name: "Female",
      value: "female",
    },
  ];

  return (
    <div className="grid w-fit grid-cols-3 gap-[10px] md:gap-[16px] fade-in">
      {gender?.map((item) => (
        <div
          key={item?.name}
          className={`flex flex-col items-center cursor-pointer w-[100px] h-[100px] md:w-[116px] md:h-[125px] border hover:border-[#ED1F28] px-[18px] py-[18px] md:px-[35px] md:py-[24px] rounded-[20px] ${
            selectedGender == item?.value ? "border-[#ED1F28]" : null
          }`}
          onClick={() => handleGenderSelect(item)}
        >
          <AppImage
            src={item?.icon}
            className="max-w-[30px] md:max-w-[48px]"
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

export default Gender;
