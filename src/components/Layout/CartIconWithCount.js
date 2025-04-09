"use client";
import Link from "next/link";
import React from "react";
import AppImage from "../Image/AppImage";
import Text from "../Text/Text";
import { CartIcon } from "@/Icons";
import useAppStore from "@/Store/Store";

function CartIconWithCount({ cartCount }) {
  const { city } = useAppStore();
  return (
    <div className="relative">
      <Link
        href={`/${city?.toLowerCase().replace(/\s+/g, "-") || "chennai"}/cart`}
        replace
      >
        <div className="hidden md:flex gap-x-[7px]">
          <AppImage src={CartIcon} loading="lazy" />
          <Text className={"text-sm font-semibold"}>{"Cart"}</Text>
        </div>
        <div className="md:hidden flex">
          <AppImage
            src={CartIcon}
            className="!w-[24px] !h-[24px]"
            loading="lazy"
          />
          {/* <Text className={"text-sm font-semibold"}>{"Cart"}</Text> */}
        </div>
        <Text
          className={`cart-count md:mt-0 mt-[8px] ${
            cartCount == 0 ? "bg-gray" : "bg-appRed"
          }`}
        >
          {cartCount || 0}
        </Text>
      </Link>
    </div>
  );
}

export default CartIconWithCount;
