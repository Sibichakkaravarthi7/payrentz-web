import React, { useContext } from "react";
import DeliveryAndKycDetails from "./DeliveryAndKycDetails";
import OrderSummaryBox from "./OrderSummaryBox";
import AppButton from "../Button/AppButton";
import CartStepButton from "./CartStepButton";
import { CartContext } from "@/app/(appLayout)/[city]/cart/page";

const CartOrderSummary = () => {
  const { step, setStep } = useContext(CartContext);
  return (
    <div className="mt-[20px]">
      <DeliveryAndKycDetails />
      <div className="mt-[10px]">
        <OrderSummaryBox />
      </div>
      <div className="gap-[10px] w-full hidden md:flex">
        <CartStepButton step={step} setStep={setStep} />
      </div>
    </div>
  );
};

export default CartOrderSummary;
