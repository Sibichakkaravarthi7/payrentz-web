import React from "react";
import AppImage from "../Image/AppImage";
import { EmptyCart } from "@/Icons";
import Text from "../Text/Text";
import AppLink from "../Link/AppLink";

const EmptyCartHandler = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-[7px] md:gap-[10px] h-[50vh]">
      <AppImage src={EmptyCart} alt="empty-cart" loading="lazy" />
      <Text className={"font-[500] text-[13px] md:text-[16px] text-[#888888]"}>
        You have no items in your cart!
      </Text>
      {/* <AppLink className={"flex gap-[10px] items-center "} link={"/"}>
        <Text className={"text-[16px] hover:text-appBlue hover:font-bold font-[500]"}>
          Continue Shopping
        </Text>
      </AppLink> */}
    </div>
  );
};

export default EmptyCartHandler;
