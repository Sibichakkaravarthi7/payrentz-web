import { InfoRedIcon } from "@/Icons";
import React from "react";
import AppImage from "../Image/AppImage";
import Text from "../Text/Text";

const PincodeChangeAlert = () => {
  return (
    <div className="red-app-tag flex gap-[8px] mt-[10px] md:mt-[10px] md:p-[6px]">
      <AppImage src={InfoRedIcon} loading="lazy" />
      <Text className={"text-[9px] md:text-[13px] font-[500]"}>
        Changing the pincode will clear the cart
      </Text>
    </div>
  );
};

export default PincodeChangeAlert;
