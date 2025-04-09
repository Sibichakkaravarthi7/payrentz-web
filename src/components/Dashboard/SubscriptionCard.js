import React from "react";
import AppDropdown from "./Dropdown";
import Text from "../Text/Text";
import AppImage from "../Image/AppImage";
import DropdownButton from "./DropdownButton";

function SubscriptionCard({
  img,
  deposit,
  name,
  rent,
  color,
  currentSub,
  brandDetail,
  model = "",
  tenure,
  productId,
  // style = "",
}) {
  const modifyStatus = (s) => {
    if (s == "assign_pending") return "Product yet to be assigned";

    return s?.replaceAll("_", " ");
  };
  return (
    <div className="mt-[20px] cursor-pointer">
      <div className="hidden md:flex flex-col gap-[10px]">
        <div className="flex gap-[30px] pt-[14px] rounded-[10px] pr-[13px] md:pr-[27px] pl-[13px] pb-[16px] bg-[#FFFFFF] shadow-md">
          <div>
            <AppImage
              src={img}
              alt="subscription-image"
              className="w-[185px] !h-[165px] rounded-[10px]"
              width={185}
              height={165}
              loading="lazy"
            />
          </div>
          <div className="w-[80%]">
            <div className="flex justify-between items-center mt-[17px]">
              <Text className={"text-[20px] font-semibold"}>{name}</Text>
              <div className="flex gap-[30px]">
                <Text className={"text-[#2B5CAB] font-semibold"}>
                  Refundable Deposit: {deposit}
                </Text>
                <Text className={"font-semibold"}>Rent: {rent}</Text>
              </div>
            </div>
            <div>
              <Text
                className={"text-[12px] text-[#858585] mt-[20px] font-medium"}
              >
                Brand: {brandDetail}
              </Text>
              <Text
                className={"text-[12px] text-[#858585] mt-[20px] font-medium"}
              >
                Tenure: {tenure} months
              </Text>
            </div>

            <div className="flex gap-[40px] mt-[20px] text-[12px] text-[#858585] font-medium">
              <Text>Model: {model}</Text>
              {/* <Text>Product Id: {productId}</Text> */}
              <Text>Product Color: {color}</Text>
            </div>
            <div className="flex justify-between mt-[7px]">
              <div className="mt-[16px] bg-red-500 bg-opacity-10 rounded-[10px] pr-[11.2px] pt-[3px] pb-[4px] pl-[12px]">
                <Text
                  className={
                    "text-[10px] text-[#DA0821] font-medium capitalize"
                  }
                >
                  {modifyStatus(currentSub)}
                </Text>
              </div>
              {/* <DropdownButton
                label={"Request"}
                item1={"Add Accesss=ories"}
                item2={"Product Upgrade"}
                item3={"Buy Product"}
              /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="grid md:hidden grid-cols-1 pt-[14px] rounded-[10px] pr-[13px] pl-[13px] pb-[16px] bg-[#FFFFFF] shadow-md">
        <div className="flex gap-[10px]">
          <div>
            <AppImage
              src={img}
              alt="product-image"
              className="!w-[120px] rounded-[10px] !h-[120px]"
              width={120}
              height={120}
              loading="lazy"
            />
          </div>
          <div className="flex flex-col text-left">
            <Text className={"text-[16px] mb-[10px] font-semibold"}>
              {name}
            </Text>
            <div className="flex flex-col gap-[10px]">
              <Text className={"text-[#2B5CAB] text-[12px] font-semibold"}>
                Refundable Deposit: {deposit}
              </Text>
              <Text className={"font-semibold text-[12px]"}>Rent: {rent}</Text>
            </div>
          </div>
        </div>
        <div>
          <Text className={"text-[12px] text-[#858585] mt-[20px] font-medium"}>
            Brand: {brandDetail}
          </Text>
          <div className="flex flex-col gap-[10px] mt-[10px] text-[12px] text-[#858585] font-medium">
            <Text>Model: {model}</Text>
            {/* <Text>Style Name: {style}</Text> */}
            <Text>Product Color: {color}</Text>
          </div>
          <div className="flex justify-between mt-[7px]">
            <div className="mt-[16px] bg-red-500 bg-opacity-10 rounded-[10px] pr-[11.2px] pt-[3px] pb-[3px] pl-[12px]">
              <Text
                className={
                  "text-[10px] text-[#DA0821] font-medium text-capitalize"
                }
              >
                {modifyStatus(currentSub)}
              </Text>
            </div>
            {/* <DropdownButton
                label={"Request"}
                item1={"Add Accesss=ories"}
                item2={"Product Upgrade"}
                item3={"Buy Product"}
              /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionCard;
