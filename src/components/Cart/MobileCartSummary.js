import React, { useState } from "react";
import DeliveryAndKycDetails from "./DeliveryAndKycDetails";
import OrderSummaryBox from "./OrderSummaryBox";
import CartStepButton from "./CartStepButton";

const MobileCartSummary = ({ step, setStep }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [startY, setStartY] = useState(0);

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    const deltaY = e.touches[0].clientY - startY;
    setIsExpanded(deltaY < 0); // Expand if moving up, collapse if moving down
  };

  return (
    <div className="md:hidden p-[5px] bg-white fixed w-full z-[10] bottom-0 bg-white">
      <div
        className={`${"cartContainer"} ${isExpanded ? "expanded" : ""}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="bg-[#DBDBDB] my-[8px] py-[2px] rounded-[5px] w-[30%] mx-auto"></div>
        <div>
          <DeliveryAndKycDetails />
          <div className="mt-[10px]">
            <OrderSummaryBox />
          </div>
        </div>
      </div>

      <div className="flex gap-[10px]">
        <CartStepButton setStep={setStep} step={step} />
      </div>
    </div>
  );
};

export default MobileCartSummary;
