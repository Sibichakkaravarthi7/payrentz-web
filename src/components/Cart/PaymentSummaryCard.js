import React from "react";
import Text from "../Text/Text";
import { convertToPrice } from "@/utils/Constants";
import AppImage from "../Image/AppImage";
import { InfoIcon } from "@/Icons";

const PaymentSummaryCard = ({ data, title, titleColor = "", info }) => {
  return (
    <div className="w-full max-w-[385px]">
      <div className="rounded-[5px] p-[12px] md:p-[20px] flex flex-col gap-[16px] md:gap-[20px]  border-[1px] border-[rgba(205, 205, 205, 0.80)]">
        <Text className={`text-[14px] font-[700] text-[${titleColor}]`}>
          {title}
        </Text>
        {data?.map((m) => (
          <div
            key={m?.title}
            className={`flex justify-between gap-[10px] flex-[1] ${
              m?.isTotal == true
                ? "md:mt-[-10px] border-t pt-[10px] border-[#DBDBDB]"
                : ""
            }`}
          >
            <Text className={"text-[14px] font-[500]"}>{m?.title}</Text>
            <Text className={"text-[14px] font-[600]"}>
              {convertToPrice(m?.price)}
            </Text>
          </div>
        ))}
      </div>
      {info ? (
        <div className="flex gap-[6px] mt-[10px]">
          <AppImage src={InfoIcon} loading="lazy" alt="info icon" />
          <Text className={"text-[12px] font-[400]"}>{info}</Text>
        </div>
      ) : null}
    </div>
  );
};

export default PaymentSummaryCard;
