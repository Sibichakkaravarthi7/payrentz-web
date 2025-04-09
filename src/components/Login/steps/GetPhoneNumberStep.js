import React from "react";
import Text from "../../Text/Text";
import LabelWrapper from "../LabelWrapper";
import LoginInput from "../LoginInput";
import AppButton from "@/components/Button/AppButton";

const GetPhoneNumberStep = ({
  setStep,
  handleInputChange,
  formData,
  setFormData,
  handleValidatePhoneNumber,
  loading,
}) => {
  return (
    <div className="flex justify-center flex-col md:items-start items-center gap-[20px] md:gap-[30px]">
      <Text className={"font-bold text-[18px] md:text-[24px] text-appRed"}>
        Let’s get you started!
      </Text>
      <LabelWrapper label={"Enter your mobile number"} className={"w-full"}>
        <LoginInput
          handleEnterClick={
            formData?.phone?.length != 10
              ? undefined
              : () => handleValidatePhoneNumber()
          }
          formData={formData}
          handleInputChange={handleInputChange}
        />
      </LabelWrapper>
      <AppButton
        wrapperClassName={"w-full md:w-fit"}
        className={"w-full"}
        text={"Send OTP"}
        variant={"red"}
        onClick={() => handleValidatePhoneNumber()}
        disabled={formData?.phone?.length != 10}
        isLoading={loading}
      />
    </div>
  );
};

export default GetPhoneNumberStep;
