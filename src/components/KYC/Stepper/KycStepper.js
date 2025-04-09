import React from "react";
import {
  Kyc1Done,
  Kyc2Done,
  Kyc3Done,
  Kyc4Done,
  Kyc2,
  Kyc3,
  Kyc4,
} from "@/Icons/index";
import AppImage from "@/components/Image/AppImage";
import Text from "@/components/Text/Text";

const KycStepper = ({ step }) => {
  const steps = [
    { title: "Personal Details", icon: Kyc1Done, isDone: true },
    {
      title: "Address Details",
      icon: step >= 2 ? Kyc2Done : Kyc2,
      isDone: step <= 2,
    },
    {
      title: "Documents",
      icon: step >= 3 ? Kyc3Done : Kyc3,
      isDone: step <= 3,
    },
    {
      title: "Say Cheese!",
      icon: step >= 4 ? Kyc4Done : Kyc4,
      isDone: step <= 4,
    },
  ];

  return (
    <div className="w-full max-w-[800px] mx-auto mt-[20px] md:mt-[40px] relative">
      <div className="flex justify-between">
        {steps?.map((m, ind) => (
          <div
            key={m?.title}
            className="flex flex-col items-center justify-center text-center gap-[9px] md:gap-[13px] relative"
          >
            <AppImage className="bg-white" src={m?.icon} loading="lazy" />
            <Text
              className={`${
                m?.isDone ? "text-appBlue" : ""
              } text-[12px] md:text-[16px] font-[700]`}
            >
              {m?.title}
            </Text>
            {/* {ind !== 0 ? (
              <div className="bg-[#DBDBDB] h-[2px] absolute left-[0px] w-[25%]"></div>
            ) : null} */}
          </div>
        ))}
      </div>

      <div className="bg-[#DBDBDB] w-[83%] h-[2px] mx-auto absolute left-[0px] right-[0px] top-[29px] z-[-4]">
        <div
          className="bg-appBlue h-[2px]"
          style={{ width: `${35 * (parseInt(step) - 1)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default KycStepper;
