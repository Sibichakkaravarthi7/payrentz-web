"use client";
import React, { useContext, useState } from "react";
import Text from "../Text/Text";
import CloseButton from "../CloseButton";
import AppButton from "../Button/AppButton";
import { useRouter } from "next/navigation";
import AppInput from "../Input/AppInput";
import toast from "react-hot-toast";
import AppImage from "../Image/AppImage";
import { InstructonKyc } from "@/Icons";
import { KycContext } from "@/app/(kycLayout)/kyc/layout";

const KycInstructionModal = ({ onClose, onClick }) => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState();

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };

  const handleProceed = () => {
    if (checked) {
      router.push(onClick);
    } else {
      toast.error("Please check the terms and conditions");
    }
  };
  return (
    <div>
      <CloseButton
        onClick={() => onClose()}
        className={
          "absolute top-[10px] right-[10px] md:top-[10px] md:right-[10px] z-[9]"
        }
      />

      <div className="p-[10px] flex flex-col gap-[10px]">
        <Text
          className={
            "mt-[20px] md:mt-[40px] mx-[20px] text-[12px] font-[700] md:text-[20px] text-left"
          }
        >
          Dear Customer, thank you for choosing payrentz as your preferred
          rental partner.
        </Text>
        <div className="flex items-center justify-center">
          <AppImage
            src={InstructonKyc}
            alt="instruction-image"
            className="max-w-[200px]"
            loading="lazy"
          />
        </div>
        <div className="text-left flex flex-col mx-[20px] my-[20px] gap-[5px]">
          <Text className={"font-[500] text-[10px] md:text-[18px] mb-[10px]"}>
            Please have the following information handy to complete your KYC
            process seamlessly.
          </Text>
          <Text className={"text-[8px] md:text-[16px]"}>
            - PAN Number and Aadhaar Number
          </Text>
          <Text className={"text-[8px] md:text-[16px]"}>
            - Soft copy of your Office ID or Institution ID
          </Text>
          <Text className={"text-[8px] md:text-[16px]"}>
            - Soft copy of Rental Agreement or Utility Bill or equivalent
          </Text>
          <Text className={"text-[8px] md:text-[16px]"}>
            - Bank Account with IFSC details
          </Text>
        </div>

        <div className="text-left flex mx-[20px] my-[10px] gap-[5px]">
          <AppInput
            type="checkbox"
            name="termsAndCondition"
            isError={error}
            id="mobile"
            // value={"true"}
            onChange={(e) => handleCheckboxChange(e)}
            wrapperClassName="!w-fit"
            className="!w-[15px] ml-[11px] h-[15px]"
          />

          <Text className={"ml-[10px] text-[10px] md:text-[16px]"}>
            All details provided by me are true and correct. I have read and
            understood the{" "}
            <span className="!text-[#ffffff], text-decoration-line: underline">
              <a
                target="_blank"
                className="text-[#2B5CAB]"
                href="/terms-and-conditions"
              >
                terms & conditions
              </a>
            </span>{" "}
            of the rental contract.
          </Text>
        </div>
      </div>

      <div className="flex justify-center mt-[20px] mb-[20px]">
        <AppButton
          text={"Proceed"}
          variant={"red"}
          className={"!px-[20px] !py-[10px]"}
          onClick={() => handleProceed()}
        />
      </div>
    </div>
  );
};

export default KycInstructionModal;
