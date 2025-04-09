import React from "react";

const ProductTag = ({ text, isAccessories }) => {
  const getTagColor = (txt) => {
    if (txt?.toLowerCase() == "newly added") return "text-appRed bg-[#d6d6d6]";
    if (txt?.toLowerCase() == "limited time offer")
      return "bg-appRed text-white";
  };
  return (
    <div
      className={` ${
        isAccessories
          ? "text-[5px] md:text-[12px]"
          : "text-[7px] md:text-[14px]"
      }  font-bold rounded-[3px] p-[5px] inline capitalize ${getTagColor(
        text
      )}`}
    >
      {text}
    </div>
  );
};

export default ProductTag;
