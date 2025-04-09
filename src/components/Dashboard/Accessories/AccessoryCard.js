import AppImage from "@/components/Image/AppImage";
import Text from "@/components/Text/Text";
import { convertToPrice } from "@/utils/Constants";
import React from "react";

function AccessoryCard({ img, price, quantity, identity }) {
  return (
    <div className="bg-[#ffffff] p-[10px] rounded-[10px] shadow-md">
      <AppImage
        src={img}
        alt="accesory-image"
        className="md:!w-[300px] !w-[150px] !h-[150px] md:!h-[300px] rounded-[10px]"
        width={300}
        height={300}
        loading="lazy"
      />
      <div className="flex flex-col gap-[5px] pt-[5px]">
        <Text className={"text-[12px]  md:text-[18px] font-semibold"}>
          {identity}
        </Text>
        <Text className={"text-[14px] md:text-[24px] font-semibold"}>
          {convertToPrice(price)}
        </Text>
        <Text
          className={"text-[10px] text-[#858585] md:text-[14px] font-semibold"}
        >
          Quantity: {quantity}
        </Text>
      </div>
    </div>
  );
}

export default AccessoryCard;
