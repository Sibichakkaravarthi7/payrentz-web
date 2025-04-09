import React from "react";
import AppImage from "../Image/AppImage";
import Text from "../Text/Text";
import AppButton from "../Button/AppButton";

function ClosedSubscriptionCard({
  img,
  name,
  startDate,
  endDate,
  currentSub,
  tenure,
}) {
  return (
    <div className="mt-[20px]">
      <div className="hidden md:flex flex-col gap-[10px]">
        <div className="flex gap-[30px] pt-[14px] rounded-[10px] pr-[27px] pl-[13px] pb-[16px] bg-[#FFFFFF] shadow-md">
          <div className="!w-[185px] rounded-[10px] h-[165px]">
            <AppImage
              src={img}
              alt="product-image"
              className="!w-[185px] invert-[30%] rounded-[10px] !h-[165px]"
              loading="lazy"
            />
          </div>
          <div className="w-[80%]">
            <div className="flex justify-between items-center mt-[17px]">
              <Text className={"text-[20px] font-semibold"}>{name}</Text>
            </div>
            <div className="flex justify-between">
              <div className="mt-[20px] flex gap-[62px]">
                <div className="flex flex-col gap-[20px]">
                  <Text
                    className={
                      "text-[12px] whitespace-nowrap text-[#858585] font-medium"
                    }
                  >
                    Subscription Start Date: {startDate}
                  </Text>
                  <Text
                    className={
                      "text-[12px] whitespace-nowrap text-[#858585] font-medium"
                    }
                  >
                    Subscription End Date: {endDate}
                  </Text>
                  <div className="bg-[#DBDBDB] w-[60%] bg-opacity-80 rounded-[10px] pr-[11.2px] pt-[3px] pb-[4px] pl-[12px]">
                    <Text
                      className={
                        "text-[10px] whitespace-nowrap text-[#858585] font-medium"
                      }
                    >
                      {currentSub}
                    </Text>
                  </div>
                </div>
                <div>
                  <Text
                    className={
                      "text-[12px] whitespace-nowrap text-[#858585] font-medium"
                    }
                  >
                    Tenure: {tenure} Months
                  </Text>
                </div>
              </div>
              <div className="flex w-full items-end justify-end">
                <AppButton text={"Re-Subscribe"} variant={"red"} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:hidden pt-[14px] rounded-[10px] px-[13px] pb-[16px] bg-[#FFFFFF] shadow-md">
        <div className="grid grid-cols-2">
          <div className="!w-[120px] rounded-[10px]">
            <AppImage
              src={img}
              alt="product-image"
              className="!w-[120px] invert-[30%] rounded-[10px] !h-[120px]"
              loading="lazy"
            />
          </div>
          <div className="ml-[-30px]">
            <Text className={"text-[16px] font-semibold"}>{name}</Text>
            <div className="flex flex-col">
              <div className="mt-[20px]">
                <div className="flex flex-col gap-[10px]">
                  <Text
                    className={
                      "text-[10px] whitespace-nowrap text-[#858585] font-medium"
                    }
                  >
                    Subscription Start Date: {startDate}
                  </Text>
                  <Text
                    className={
                      "text-[10px] whitespace-nowrap text-[#858585] font-medium"
                    }
                  >
                    Subscription End Date: {endDate}
                  </Text>
                  <div className="bg-[#DBDBDB] w-[60%] bg-opacity-80 rounded-[10px] pr-[11.2px] pt-[3px] pb-[4px] pl-[12px]">
                    <Text
                      className={
                        "text-[8px] whitespace-nowrap text-[#858585] font-medium"
                      }
                    >
                      {currentSub}
                    </Text>
                  </div>
                </div>
                <div className="mt-[10px]">
                  <Text
                    className={
                      "text-[10px] whitespace-nowrap text-[#858585] font-medium"
                    }
                  >
                    Tenure: {tenure} Months
                  </Text>
                </div>
              </div>
              <div className="flex w-full mt-[10px] items-end justify-end">
                <AppButton text={"Re-Subscribe"} variant={"red"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClosedSubscriptionCard;
