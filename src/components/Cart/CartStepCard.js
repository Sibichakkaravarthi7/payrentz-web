import React from "react";
import AppImage from "../Image/AppImage";
import Text from "../Text/Text";
import { BlueTickIcon, CartIcon } from "@/Icons";

const CartStepCard = ({ step, cardStep, children, icon, title }) => {
  const handleColor = (_step, _cardStep) => {
    if (_step == _cardStep) return "text-[#2D2D2D] cart-icon-dark-gray";
    if (_step > _cardStep) return "text-[#2B5CAB] cart-icon-blue";
    return "text-[#CDCDCD] cart-icon-light-gray";
  };

  return (
    <div className="py-[10px] md:py-[20px] border-b border-[#CDCDCD]">
      <div className="flex justify-between items-center">
        <div className="flex gap-[7px] md:gap-[12px] items-center">
          <div
            className={`h-[12px] w-[12px] md:h-[23px] md:w-[23px] ${handleColor(
              step,
              cardStep
            )}`}
          >
            {icon}
          </div>

          <Text
            className={`text-[16px] md:text-[20px] font-bold ${handleColor(
              step,
              cardStep
            )}`}
          >
            {title}
          </Text>
        </div>
        {step > cardStep ? (
          <AppImage src={BlueTickIcon} loading="lazy" alt="tick-icon" />
        ) : null}
      </div>

      <div>{step == cardStep ? children : null}</div>
    </div>
  );
};

export default CartStepCard;
