import AppButton from "@/components/Button/AppButton";
import AppImage from "@/components/Image/AppImage";
import Text from "@/components/Text/Text";
import React from "react";

function InvoiceProductCard({
  img,
  productName,
  invoiceId,
  invoiceDate,
  lateFee,
  paymentstatus,
  dueDate,
  amountAfterLateFee,
  total,
}) {
  return (
    <>
      <div className="mt-[20px] w-full bg-[#FFFFFF] pl-[13px] pt-[14px] pb-[16px] pr-[26px] shadow-md hidden md:flex rounded-[10px] gap-[30px]">
        <div className="w-[80%]">
          <div className="mt-[17px]">
            <Text className={"text-[20px] text-[#1D1D1D] font-semibold"}>
              {"You have a pending invoice!"}
            </Text>
          </div>
          <div className="flex gap-[133px] w-full">
            <div className="flex gap-[120px] text-[12px] text-[#858585] mt-[20px] font-medium">
              <div className="flex flex-col gap-[20px]">
                <Text>Invoice Date: {invoiceDate}</Text>
                <Text>Late Fee: ₹ {lateFee}</Text>
                <div className="bg-red-500 w-fit bg-opacity-10 rounded-[10px] pr-[11.2px] pt-[3px] pb-[4px] pl-[12px]">
                  <Text className={"text-[10px] text-[#DA0821] font-medium"}>
                    {paymentstatus}
                  </Text>
                </div>
              </div>
              <div className="flex flex-col gap-[20px]">
                <Text>Due Date: {dueDate}</Text>
                <div>
                  <Text>Amount after late fee: ₹ {amountAfterLateFee}</Text>
                  <Text>(if not paid before due date)</Text>
                </div>
              </div>
            </div>

            <div>
              <Text className={" mb-[17px] text-[20px] font-semibold"}>
                Total Amount: ₹ {total}
              </Text>
              <div className="w-full flex items-end justify-end">
                <AppButton text={"Pay Now"} variant={"red"} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[20px] w-full bg-[#FFFFFF] pl-[13px] pt-[14px] pb-[16px] pr-[26px] shadow-md grid grid-cols-2 md:hidden rounded-[10px]">
        <div className="ml-[-20px]">
          <Text className={"text-[12px] text-[#1D1D1D] font-semibold"}>
            {productName} - {invoiceId}
          </Text>
          <div className="flex gap-[10px] text-[8px] text-[#858585] mt-[20px] font-medium">
            <div className="flex flex-col gap-[20px]">
              <Text>Invoice Date: {invoiceDate}</Text>
              <Text>Late Fee: ₹ {lateFee}</Text>
              <div className="bg-red-500 w-fit bg-opacity-10 rounded-[10px] pr-[11.2px] pt-[3px] pb-[4px] pl-[12px]">
                <Text className={"text-[10px] text-[#DA0821] font-medium"}>
                  {paymentstatus}
                </Text>
              </div>
            </div>
            <div className="flex flex-col gap-[20px]">
              <Text>Due Date: {dueDate}</Text>
              <div>
                <Text>Amount after late fee: ₹ {amountAfterLateFee}</Text>
                <Text>(if not paid before due date)</Text>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <Text className={"mt-[10px] mb-[10px] text-[14px] font-semibold"}>
            Total Amount: ₹ {total}
          </Text>
        </div>
        <div className="w-full flex items-end justify-end">
          <AppButton text={"Pay Now"} variant={"red"} />
        </div>
      </div>
    </>
  );
}

export default InvoiceProductCard;
