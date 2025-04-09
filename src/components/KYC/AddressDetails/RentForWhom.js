"use client";

import { FamilyIcon, FriendsIcon, SingleIcon } from "@/Icons";
import React, { useContext } from "react";
import AppImage from "../../Image/AppImage";
import Text from "@/components/Text/Text";
import { KycContext } from "@/app/(kycLayout)/kyc/layout";

function RentForWhom() {
  const { formData, setFormData, setStep, step, mutate } =
    useContext(KycContext);
  const selectedRentFor = formData?.rent_for;

  const handleSelect = (val) => {
    setFormData((prv) => ({
      ...prv,
      rent_for: val?.value,
      steps_completed: step,
    }));
    // mutate({
    //   rent_for: val?.value,
    //   steps_completed: step,
    // });
    // setStep("next");
  };

  const rentForWhom = [
    {
      icon: SingleIcon,
      alt: "single-icon",
      name: "Me",
      value: "me",
    },
    {
      icon: FriendsIcon,
      alt: "Friends-icon",
      name: "Me & My Friends",
      value: "me_and_my_friends",
    },
    {
      icon: FamilyIcon,
      name: "Me & My Family",
      alt: "family-icon",
      value: "me_and_my_family",
    },
  ];
  return (
    <div className="flex cursor-pointer gap-[10px] md:gap-[16px] fade-in">
      {rentForWhom?.map((item) => (
        <div
          key={item?.name}
          onClick={() => handleSelect(item)}
          className={`flex flex-col w-[100px] h-[100px] md:w-[116px] md:h-[125px] items-center border
           hover:border-[#ED1F28] px-[18px] py-[18px] md:px-[35px] md:py-[24px] rounded-[20px] ${
             selectedRentFor == item?.value ? "border-[#ED1F28]" : null
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
              "text-[10px] md:text-[12px] text-center md:whitespace-nowrap font-bold text-[#1D1D1D] mt-[10px] md:mt-[19px]"
            }
          >
            {item?.name}
          </Text>
        </div>
      ))}
    </div>
  );
}

export default RentForWhom;
