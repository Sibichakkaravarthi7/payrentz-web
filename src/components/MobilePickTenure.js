import React, { useState } from "react";
import Text from "./Text/Text";
import AppButton from "./Button/AppButton";

function MobilePickTenure({
  tenure,
  price,
  upgrade,
  relocation,
  closure,
  savings,
  selectedTenure,
  setSelectedTenure,
  id,
}) {
  return (
    <div className="!w-full border px-[10px] rounded-[5px] mt-[20px] grid grid-cols-1 divide-y-2">
      <div className="grid grid-cols-2 px-[10px] py-[10px]">
        <div className="text-left">
          <Text className={"text-[13px]"}>{tenure}</Text>
          <div className="flex mt-[10px]">
            <Text className={"text-[20px] font-semibold"}>{price}</Text>
            <div className="flex items-end">
              <Text className={"text-[12px] text-[#858585]"}>/month</Text>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <AppButton
            text={selectedTenure == id ? "Selected" : "Pick Tenure"}
            variant={selectedTenure == id ? "red" :"redOutline"}
            className={"whitespace-nowrap"}
            onClick={()=>setSelectedTenure(id)}
          />
        </div>
      </div>
      <div className="flex justify-between px-[10px] py-[10px]">
        <Text className={"text-[#2B5CAB] text-[12px] font-semibold"}>
          Monthly rental savings
        </Text>
        <Text className={"text-[12px]"}> {savings}</Text>
      </div>
      <div className="flex justify-between px-[10px] py-[10px]">
        <Text className={"text-[#2B5CAB] text-[12px] font-semibold"}>
          Early closure charges
        </Text>
        <Text className={"text-[12px]"}>{closure}</Text>
      </div>
      {/* <div className="flex justify-between px-[10px] py-[10px]">
        <Text className={"text-[#2B5CAB] text-[12px] font-semibold"}>
          Free relocation
        </Text>
        <Text className={"text-[12px]"}> {relocation}</Text>
      </div>
      <div className="flex justify-between px-[10px] py-[10px]">
        <Text className={"text-[#2B5CAB] text-[12px] font-semibold"}>
          Free upgrade
        </Text>
        <Text className={"text-[12px]"}>{upgrade}</Text>
      </div> */}
    </div>
  );
}

export default MobilePickTenure;
