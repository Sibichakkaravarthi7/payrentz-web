import React from "react";
import AppImage from "./Image/AppImage";
import Text from "./Text/Text";
import AppButton from "./Button/AppButton";

const DesktopPickTenure = ({
  tenure,
  price,
  upgrade,
  relocation,
  closure,
  savings,
  selectedTenure,
  id,
  setSelectedTenure,
  minimum_rental_period,
}) => {
  return (
    <div
      className={`hover:border-[#ED1F28] rounded-[5px] hover:scale-[105%] transition ease-in-out cursor-pointer hover:border-[2px] hover:rounded-[5px] hover:shadow-md ${
        selectedTenure == id ? "border-[2px] border-[#ED1F28]" : ""
      }`}
      onClick={() => setSelectedTenure(id)}
    >
      <div className="border flex flex-col items-center rounded-[5px] md:px-[16px] pb-[33px] bg-[#FFFFFF] text-[#2D2D2D] border-[#DBDBDB]">
        <Text className={"text-[15px] font-semibold mb-[10px] mt-[32px]"}>
          {tenure}
        </Text>
        <div className="grid grid-cols-1">
          <Text className={"text-[28px] text-center font-bold text-[#2D2D2D]"}>
            {price}
          </Text>
          <Text
            className={
              "!text-[12px] text-center place-items-center font-medium !text-[#858585] mb-[20px]"
            }
          >
            /month
          </Text>
        </div>
        <AppButton
          text={selectedTenure == id ? "Selected" : "Pick Tenure"}
          variant={"redOutline"}
          onClick={() => setSelectedTenure(id)}
          className={
            "!px-[10px] !py-[9px] whitespace-nowrap !leading-[10px] !text-[14px]"
          }
        />
        <Text className={"mt-[40px] font-semibold text-[14px]"}>
          {tenure == "1 month+" ? "NA" : savings}
        </Text>
        <Text className={"mt-[35px] font-semibold text-[14px]"}>{closure}</Text>
        <Text className={"mt-[35px] font-semibold text-[14px]"}>
          {minimum_rental_period}
        </Text>
        {/* <Text className={"mt-[35px] font-semibold text-[14px]"}>
          {relocation}
        </Text>
        <Text className={"mt-[35px] font-semibold text-[14px]"}>{upgrade}</Text> */}
      </div>
    </div>
  );
};

export default DesktopPickTenure;
