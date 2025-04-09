import React from "react";
import AppImage from "../Image/AppImage";
import { DeliveryTruckIcon } from "@/Icons";
import Text from "../Text/Text";

const DeliveryAndKycDetails = () => {
  return (
    <div className="flex gap-[15px] items-center md:gap-[20px] border border-[#DBDBDB] rounded-[5px] px-[16px] py-[9px] md:px-[20px] md:py-[12px]">
      <AppImage
        src={DeliveryTruckIcon}
        alt="delivery-truck-icon"
        loading="lazy"
      />
      <div className="flex flex-col gap-[10px] text-[10px] md:text-[14px] font-[600]">
        <Text className={"text-[14px] font-bold"}>
          Order now, get it in 24 hours (after KYC). ⚡️
        </Text>
        {/* <Text className={"text-appBlue cursor-pointer underline "}>
          See Required Documents
        </Text> */}
      </div>
    </div>
  );
};

export default DeliveryAndKycDetails;
