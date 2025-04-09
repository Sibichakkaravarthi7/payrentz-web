import { tenureDetails } from "@/utils/Constants";
import React from "react";
import Text from "../Text/Text";
import AppButton from "../Button/AppButton";

function TenureDetails({ variantDetail, selectedTenure, setSelectedTenure }) {
  const tenureDetails = [
    {
      id: 12,
      months: "12+ months",
      rupees: variantDetail?.rent_12,
      perMonth: "/month",
    },
    {
      id: 6,
      months: "6+ months",
      rupees: variantDetail?.rent_6,
      perMonth: "/month",
    },
    {
      id: 3,
      months: "3+ months",
      rupees: variantDetail?.rent_3,
      perMonth: "/month",
    },
    {
      id: 1,
      months: "1 month+",
      rupees: variantDetail?.rent_1,
      perMonth: "/month",
    },
  ]?.filter((item) => variantDetail?.[`tenure_${item?.id}`]);

  return (
    <div
      className={`justify-items-center grid grid-cols-2 lg:grid-cols-${tenureDetails?.length} md:grid-cols-${tenureDetails?.length}  justify-center text-center lg:gap-[19px] md:gap-[14px] gap-[10px]`}
    >
      {tenureDetails?.map((items) => (
        <>
          {items?.rupees !== 0 ? (
            <div
              onClick={() => setSelectedTenure(items?.id)}
              key={items?.id}
              className={`cursor-pointer border transition ease-in-out rounded-[5px] md:px-[16px] px-[0px] pb-[15px] bg-[#FFFFFF] text-[#2D2D2D] border-[#DBDBDB] tenure-plans-card-small ${
                selectedTenure == items?.id
                  ? "tenure-plans-card-small-selected"
                  : ""
              }`}
            >
              <Text
                className={
                  "md:text-[15px] text-[12px] font-semibold mb-[10px] mt-[15px] md:mt-[25px] txt"
                }
              >
                {items?.months}
              </Text>
              <div className="md:grid flex items-center justify-center grid-cols-1">
                <Text
                  className={
                    "md:text-[28px]  md:text-center text-[22px] font-bold text-[#2D2D2D] txt"
                  }
                >
                  {`₹${items?.rupees}`}
                </Text>
                <Text
                  className={
                    "!text-[12px]  md:text-center place-items-center font-medium !text-[#858585] mt-[8px] md:mt-[0px] md:mb-[20px]"
                  }
                >
                  {items?.perMonth}
                </Text>
              </div>
              <div className="flex justify-center">
                <AppButton
                  text={
                    selectedTenure == items?.id ? "Selected" : "Pick Tenure"
                  }
                  variant={"redOutline"}
                  onClick={() => setSelectedTenure(items?.id)}
                  className={
                    "hidden md:block !px-[10px] !py-[9px] whitespace-nowrap !leading-[10px] !text-[14px] w-full"
                  }
                  wrapperClassName={"w-full"}
                />
              </div>
            </div>
          ) : null}
        </>
      ))}
    </div>
  );
}

export default TenureDetails;
