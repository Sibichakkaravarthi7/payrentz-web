import { charges } from "@/utils/Constants";
import React from "react";
import Text from "../Text/Text";

function Charges({ variantDetail, selectedTenure }) {
  const chargesArr = charges( variantDetail?.[`deposit_${selectedTenure}`] ,variantDetail?.handling_charge)
  return (
    <div>
      <div className="hidden md:grid border rounded-[5px] bg-[#FFFFFF] border-[#DBDBDB] px-[20px] py-[22px] mt-[20px]">
        {chargesArr?.map((items) => (
          <div
            key={items?.title}
            className="grid grid-cols-5 items-center gap-3"
          >
            <div className="flex col-span-2 gap-[30px]">
              <Text className={"!text-[14px] font-medium text-[#2D2D2D]"}>
                {items?.title}
              </Text>
              <Text className={"!text-[20px] font-bold text-[#2D2D2D]"}>
                {items?.rupees}
              </Text>
            </div>
            <div className="col-span-3 border-l-2 pl-[20px] py-[6px]">
              <Text className={"!text-[12px] font-medium text-[#858585]"}>
                {items?.descriptions}
              </Text>
            </div>
          </div>
        ))}
      </div>
      <div className="grid md:hidden grid-cols-2 divide-x-2 justify-center border rounded-[5px] bg-[#FFFFFF] border-[#DBDBDB] py-[22px] mt-[20px]">
        {chargesArr?.map((items) => (
          <div
            key={items?.title}
            className="flex flex-col mb-[15px] text-center"
          >
            <Text
              className={
                "text-[12px] md:text-[14px] font-medium text-[#2D2D2D]"
              }
            >
              {items?.title}
            </Text>
            <Text
              className={"text-[22px] md:text-[20px] font-bold text-[#2D2D2D]"}
            >
              {items?.rupees}
            </Text>
          </div>
        ))}
        <div className="flex flex-col col-span-2 gap-[9px]">
          {chargesArr?.map((items) => (
            <div key={items?.title} className="px-[37px]">
              <Text className={"text-[12px] font-medium text-[#858585]"}>
                {items?.descriptions}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Charges;
