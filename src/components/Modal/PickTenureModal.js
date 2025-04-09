import React, { useState } from "react";
import Text from "../Text/Text";
import DesktopPickTenure from "../DesktopPickTenure";
import CloseButton from "../CloseButton";
import AppImage from "../Image/AppImage";
import { CompareTenuresImage } from "@/Icons";
import AppButton from "../Button/AppButton";
import TenureComparisonViewModal from "./TenureComparisonViewModal";

const PickTenureModal = ({
  onClose,
  variantDetail,
  selectedTenure,
  setSelectedTenure,
}) => {
  const [tempSelectedTenure, tempSetSelectedTenure] = useState(selectedTenure);
  const [showFullText, setShowFullText] = useState(false);

  const getSavingsBasedOnMonthlyPrice = (tenurePrice) => {
    const pricePerMonth = parseInt(
      variantDetail?.rent_3 || variantDetail?.rent_6
    );
    const finalPercentage =
      ((pricePerMonth - parseInt(tenurePrice)) / pricePerMonth) * 100;
    return finalPercentage?.toFixed() + "%";
  };

  // console.log("variantDetail", variantDetail);
  const tenurePlans = [
    {
      id: 12,
      tenure: "12+ months",
      price: variantDetail?.rent_12,
      monthly_rental_savings: "20%",
      early_closure_charges: "1 month rent",
      free_relocation: "After 6 months",
      free_upgrade: "After 36 months",
      minimum_rental_period: "4 months",
    },
    {
      id: 6,
      tenure: "6+ months",
      price: variantDetail?.rent_6,
      monthly_rental_savings: "10%",
      early_closure_charges: "1 month rent",
      free_relocation: "After 6 months",
      free_upgrade: "After 36 months",
      minimum_rental_period: "3 months",
    },
    {
      id: 3,
      tenure: "3+ months",
      price: variantDetail?.rent_3,
      monthly_rental_savings: "0%",
      early_closure_charges: "1 month rent",
      free_relocation: "After 6 months",
      free_upgrade: "After 36 months",
      minimum_rental_period: "2 months",
    },
    {
      id: 1,
      tenure: "1 month+",
      price: variantDetail?.rent_1,
      monthly_rental_savings: "NA",
      early_closure_charges: "1 month rent",
      free_relocation: "After 6 months",
      free_upgrade: "After 36 months",
      minimum_rental_period: "1 month",
    },
  ]?.filter((item) => variantDetail?.[`tenure_${item?.id}`]);

  const textToShow = [
    "1. Security Deposit is refundable on return of the product.",
    "2. Handling Charge is non-refundable - to cover delivery, pickup, installation & service.",
    "3. Security Deposit is refundable on return of the product.",
    "4. Handling Charge is non-refundable - to cover delivery, pickup, installation & service.",
    "5. Security Deposit is refundable on return of the product.",
  ];

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const handleConform = () => {
    setSelectedTenure(tempSelectedTenure);
    onClose();
  };
  return (
    <div>
      <CloseButton
        onClick={() => onClose()}
        className={
          "absolute top-[10px] right-[10px] md:top-[20px] md:right-[20px] z-[9]"
        }
      />
      <Text
        className={
          "text-appRed mt-[20px] md:mt-0 text-[18px] font-[700] md:text-[22px] text-center"
        }
      >
        Compare rental tenure before making a decision!
      </Text>
      <div className="hidden md:grid grid-cols-5 mt-[30px] gap-[10px]">
        <div className="pt-[22px]">
          <AppImage
            src={CompareTenuresImage}
            className="w-[142px] h-[142px]"
            loading="lazy"
          />
          <Text className={"text-[#2B5CAB] mt-[35px] text-[14px] font-bold"}>
            Monthly rental savings
          </Text>
          <Text className={"text-[#2B5CAB] mt-[35px] text-[14px] font-bold"}>
            Early closure charges
          </Text>
          <Text className={"text-[#2B5CAB] mt-[35px] text-[14px] font-bold"}>
            Minimum rental period
          </Text>
          {/* <Text className={"text-[#2B5CAB] mt-[35px] text-[14px] font-bold"}>
            Free relocation
          </Text>
          <Text className={"text-[#2B5CAB] mt-[35px] text-[14px] font-bold"}>
            Free upgrade
          </Text> */}
        </div>
        {tenurePlans?.map((item) => (
          <DesktopPickTenure
            key={item?.tenure}
            tenure={item?.tenure}
            price={"₹" + item?.price}
            savings={getSavingsBasedOnMonthlyPrice(item?.price)}
            closure={item?.early_closure_charges}
            minimum_rental_period={item?.minimum_rental_period}
            // relocation={item?.free_relocation}
            // upgrade={item?.free_upgrade}
            selectedTenure={tempSelectedTenure}
            setSelectedTenure={tempSetSelectedTenure}
            id={item?.id}
          />
        ))}
      </div>
      <div className="md:hidden">
        {/* {tenurePlans?.slice(0, 1)?.map((item) => (
          <MobilePickTenure
            tenure={item?.tenure}
            price={item?.price}
            savings={item?.monthly_rental_savings}
            closure={item?.early_closure_charges}
            relocation={item?.free_relocation}
            upgrade={item?.free_upgrade}
          />
        ))} */}
        <TenureComparisonViewModal
          getSavingsBasedOnMonthlyPrice={getSavingsBasedOnMonthlyPrice}
          tenurePlans={tenurePlans}
          selectedTenure={tempSelectedTenure}
          setSelectedTenure={tempSetSelectedTenure}
        />
      </div>
      {/* <div className="hidden md:flex flex-col leading-4 border border-[#DBDBDB] text-[#858585] mt-[20px] rounded-[5px] p-[15px]">
        <Text className={"text-[12px] font-medium"}>
          Security Deposit is refundable on return of the product.
        </Text>
        <Text className={"text-[12px] font-medium"}>
          Handling Charge is non-refundable - to cover delivery, pickup,
          installation & service.
        </Text>
        <Text className={"text-[12px] font-medium"}>
          Security Deposit is refundable on return of the product.
        </Text>
        <Text className={"text-[12px] font-medium"}>
          Handling Charge is non-refundable - to cover delivery, pickup,
          installation & service.
        </Text>
        <Text className={"text-[12px] font-medium"}>
          Security Deposit is refundable on return of the product.
        </Text>
      </div> */}
      {/* <div className="text-[#858585] mt-[20px] md:hidden rounded-[5px]">
        {textToShow.map((text, index) => (
          <Text
            key={index}
            className={`text-[10px] !leading-3 font-semibold ${
              !showFullText ? "hidden" : ""
            }`}
          >
            {text}
          </Text>
        ))}
        <Text
          onClick={toggleText}
          className="mt-2 text-[#2B5CAB] font-semibold cursor-pointer"
        >
          {showFullText ? "Read Less" : "Read More"}
        </Text>
      </div> */}
      <div className="flex justify-center mt-[20px]">
        <AppButton
          text={"Confirm Tenure"}
          variant={"red"}
          className={"!px-[40px] !py-[20px]"}
          onClick={() => handleConform()}
        />
      </div>
    </div>
  );
};

export default PickTenureModal;
