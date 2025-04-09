"use client";

import {
  SelfEmployedIcon,
  StudentIcon,
  WorkingProfessionalIcon,
} from "@/Icons";
import React, { useContext } from "react";
import AppImage from "../../Image/AppImage";
import Text from "../../Text/Text";
import { KycContext } from "@/app/(kycLayout)/kyc/layout";

function Occupation() {
  const { formData, setFormData, setStep, step, mutate } =
    useContext(KycContext);
  const selectedOccupation = formData?.occupation;

  const handleSelect = (val) => {
    setFormData((prv) => ({
      ...prv,
      occupation: val?.value,
      professional_document: null,
      steps_completed: step,
    }));
    // mutate({
    //   occupation: val?.value,
    //   steps_completed: step,
    // });
    // setStep("next");
  };

  const occupation = [
    {
      icon: StudentIcon,
      alt: "student-icon",
      name: "Student",
      value: "student",
    },
    {
      icon: WorkingProfessionalIcon,
      alt: "workin-icon",
      name: "Working Professional",
      value: "working_professional",
    },
    {
      icon: SelfEmployedIcon,
      alt: "self-employed-icon",
      name: "Self Employed",
      value: "self_employed",
    },
  ];

  return (
    <div className="flex cursor-pointer gap-[10px] md:gap-[16px] fade-in">
      {occupation?.map((item) => (
        <div
          key={item?.name}
          onClick={() => handleSelect(item)}
          className={`flex flex-col w-[100px] h-[100px] md:w-[116px] md:h-[125px] items-center border hover:border-[#ED1F28] px-[18px]
           py-[18px] md:px-[35px] md:py-[24px] rounded-[20px]
           ${selectedOccupation == item?.value ? "border-[#ED1F28]" : null}`}
        >
          <AppImage
            src={item?.icon}
            className="max-w-[30px] md:max-w-[47px]"
            alt={item?.alt}
            loading="lazy"
          />
          <Text
            className={
              "text-[10px] md:text-[12px] text-center font-bold text-[#1D1D1D] mt-[10px] md:mt-[19px]"
            }
          >
            {item?.name}
          </Text>
        </div>
      ))}
    </div>
  );
}

export default Occupation;
