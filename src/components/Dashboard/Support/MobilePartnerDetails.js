import { DeliveryOperator } from "@/Icons";
import AppImage from "@/components/Image/AppImage";
import Text from "@/components/Text/Text";
import moment from "moment";
import React from "react";
function MobilePartnerDetails({
  WallpaperIcon,
  TabWithPenIcon,
  partnerName = "-",
  scheduledDate = "-",
  vehicleNo = "-",
  vehicle = "-",
  scheduledTime = "-",
}) {
  return (
    <div className="mt-[40px] flex gap-[22px] border border-[#616876] border-opacity-[0.16] rounded-[10px] shadow-md px-[18px] py-[17px]">
      <div className="pl-[7px] hidden md:flex items-center">
        <AppImage
          src={DeliveryOperator}
          alt="delivery-operator"
          className="w-[120px] md:w-[168px] md:h-[140px] h-[120px]"
        />
      </div>
      <div className="!w-[80%] grid grid-cols-1">
        <div>
          <Text className={"font-bold text-[#1D1D1D]"}>Delivery Partner</Text>
        </div>
        <div className="mt-[20px] md:flex grid grid-cols-1 items-end justify-between">
          <div className="flex flex-col gap-[10px]">
            <Text className={"font-medium text-[#2B5CAB] capitalize"}>
              {partnerName || "-"}
            </Text>
            <Text className={"text-[10px] font-medium"}>{`Vehicle: ${
              vehicle || "-"
            }`}</Text>
            <Text className={"text-[10px] font-medium"}>
              {`Vehicle No: ${vehicleNo || "-"}`}
            </Text>
            <Text className={"text-[10px] font-medium"}>
              {`Scheduled Date: ${
                moment(scheduledDate)?.format("dddd, MMMM Do YYYY") || "-"
              }`}
            </Text>
            <Text className={"text-[10px] font-medium"}>
              {`Expected Time: ${scheduledTime || "-"}`}
            </Text>
          </div>
          <div className="flex flex-col gap-[10px] mt-[10px] md:mt-0">
            <div className="flex gap-[7px] border cursor-pointer border-[#E4E6E8] rounded-[5px] opacity-[0.5] px-[15px] py-[8px]">
              <AppImage src={WallpaperIcon} alt="wallpaper" />
              <Text className={"text-[12px]"}>View Images</Text>
            </div>
            <div className="bg-[#2B5CAB] flex gap-[7px] cursor-pointer rounded-[5px] opacity-[0.5] px-[15px] py-[8px]">
              <AppImage src={TabWithPenIcon} alt="tab-with-pen" />
              <Text className={"text-[#FFF] text-[12px]"}>Consent Form</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobilePartnerDetails;
