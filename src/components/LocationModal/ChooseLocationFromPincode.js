import React, { useState } from "react";
import Text from "../Text/Text";
import LabelWrapper from "../Login/LabelWrapper";
import AppButton from "../Button/AppButton";
import AppInput from "../Input/AppInput";
import { appHandleChange, getUserToken } from "@/utils/Constants";
import PincodeChangeAlert from "./PincodeChangeAlert";

const ChooseLocationFromPincode = ({
  onClose,
  error,
  handleVerifyPincode,
  isLoading,
  pincodeValue,
  setPincodeValue,
  isLocationChangeOn = false,
}) => {
  const handleVerify = () => {
    handleVerifyPincode(pincodeValue?.pincode);
  };

  const userToken = getUserToken();

  // console.log("pincodeValue", userToken);

  return (
    <div
      className="pb-[20px] md:pb-[30px]
     border-b-border-[#DBDBDB]
     "
    >
      <Text className={"font-bold text-[18px] md:text-[24px] text-appRed"}>
        Choose your location
      </Text>
      {/* {isLocationChangeOn ? <PincodeChangeAlert /> : null} */}
      <LabelWrapper
        label={"Enter PIN code"}
        className={"w-full mt-[16px] md:mt-[30px]"}
      >
        <div className="flex gap-[10px] items-center">
          <AppInput
            onInput={(e) =>
              (e.target.value = /^[0-9]+$/.test(e.target.value)
                ? e.target.value
                : null)
            }
            // onInput={(e)=> {
            //   const value = e.target.value.replace([^0-9]/g,'')
            //   e.target.value = value
            // }}
            maxLength={6}
            // type="pincode"
            isError={error}
            className="!bg-white border border-[#E6E7E9] rounded-[5px] basis-[70%] md:basis-[245px]"
            placeholder={"******"}
            name={"pincode"}
            onChange={(e) => appHandleChange(e, setPincodeValue)}
            onKeyDownCapture={(e) =>
              e.key === "Enter" ? handleVerify() : null
            }
            value={pincodeValue}
          />
          <AppButton
            color="white"
            wrapperClassName={"w-fit"}
            className={"md:py-[6px]"}
            text={"Proceed"}
            isLoading={isLoading}
            variant={"red"}
            onEnterPress={() => handleVerify()}
            onClick={() => handleVerify()}
            disabled={pincodeValue?.pincode?.length !== 6}
          />
        </div>
      </LabelWrapper>
      {/* <Text
        className={
          "font-medium text-[8px] md:text-[12px] text-appRed underline cursor-pointer mt-[8px] md:mt-[10px]"
        }
      >
        Detect my location
      </Text> */}
      {error ? (
        <Text
          className={
            "text-appRed mt-[10px] text-[9px] md:text-[13px] fomt-[500]"
          }
        >
          {error + " "}
        </Text>
      ) : null}
    </div>
  );
};

export default ChooseLocationFromPincode;
