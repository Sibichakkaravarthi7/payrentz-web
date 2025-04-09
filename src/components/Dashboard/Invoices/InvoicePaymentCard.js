import AppButton from "@/components/Button/AppButton";
import Text from "@/components/Text/Text";
import { convertToPrice } from "@/utils/Constants";
import React from "react";

const InvoicePaymentCard = ({
  title = "You have a pending invoice!",
  amount = "100",
  description = "Pay on time to avoid late fee",
  invoiceData,
  onClick,
  isLoading = false,
}) => {
  const amt = Math.abs(invoiceData?.data?.total);
  return (
    <>
      {invoiceData?.data?.data?.length > 0 ? (
        <div className="flex justify-between rounded-[10px] items-center px-[20px] py-[20px] w-full max-w-[740px] my-[10px] md:my-[20px] shadow bg-[#F3F7FF]">
          <div>
            <Text className={"text-[13px] md:text-[20px] font-[600] mb-[3px] text-appBlue"}>
              {title}
            </Text>
            <Text className={"font-[500] text-[11px] md:text-[14px] text-gray"}>{description}</Text>
          </div>
          <AppButton
            onClick={onClick}
            className={"text-[14px]"}
            variant={"red"}
            text={`Pay ${convertToPrice(amt)}`}
            isLoading={isLoading}
          />
        </div>
      ) : null}
    </>
  );
};

export default InvoicePaymentCard;
