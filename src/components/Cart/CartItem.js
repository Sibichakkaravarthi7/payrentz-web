"use client";
import React from "react";
import AppImage from "../Image/AppImage";
import { ImagePlaceholder, WashingMachine } from "@/Icons";
import Text from "../Text/Text";
import CartItemQuantityAndTenure from "./CartItemQuantityAndTenure";
import AppLink from "../Link/AppLink";
import { useRouter } from "next/navigation";
import { SET_PRODUCT_VIEW_PATH } from "@/utils/Constants";
import { usePathname } from "next/navigation";

const CartItem = ({ cartItem, showBorder, refetch, handleDeleteClick }) => {
  const { identity, rent, image, deposit, uuid } = cartItem;
  const router = useRouter();
  const pathname = usePathname();
  const cleanPathname = pathname?.split("/").filter(Boolean)[0] || "";
  const takeToVariantPage = () => {
    router.push(
      SET_PRODUCT_VIEW_PATH(
        `${cleanPathname}`?.replace("//", "/"),
        cartItem?.category_slug,
        cartItem?.variant_slug
      )
    );
  };

  // console.log("tenure", cartItem);

  return (
    <div
      className={`flex justify-between px-[0px] md:px-[10px] ${
        showBorder ? "border-b border-[#DBDBDB]" : null
      }`}
    >
      <div className="flex gap-[12px] md:gap-[19px] py-[10px] md:py-[20px] w-full">
        <AppImage
          onClick={() => takeToVariantPage()}
          className="w-[85px] h-[80px] md:max-w-[130px] md:max-h-[116px] md:h-full md:w-full object-cover cursor-pointer"
          src={image || ImagePlaceholder}
          width={130}
          height={116}
          alt="product-image"
          loading="lazy"
        />
        <div className="gap-[7px] md:gap-[10px] flex flex-col w-full">
          <div className="flex justify-between gap-[15px]">
            <Text
              onClick={() => takeToVariantPage()}
              className={"text-[14px] md:text-[18px] font-[700] cursor-pointer"}
            >
              {identity}
            </Text>

            <button>
              <Text
                onClick={() => handleDeleteClick(cartItem)}
                className={
                  "text-[10px] md:text-[15px] font-[500] hover:font-[700] hover:text-appRed"
                }
              >
                Remove
              </Text>
            </button>
          </div>
          <div>
            <Text
              className={"text-[15px] md:text-[24px] font-extrabold inline"}
              text={`₹${rent}`}
            />
            <Text
              className={
                "text-[10px] text-lightGray md:text-[16px] font-medium inline"
              }
              text="/month"
            />
          </div>
          <div className="flex items-center gap-[4px]">
            <Text className={"font-[500] text-[12px] md:text-[16px]"}>
              Refundable Deposit:
            </Text>{" "}
            <Text className={"font-[700] text-[12px] md:text-[16px]"}>
              {"₹" + deposit}
            </Text>
          </div>
          <div className="flex items-center gap-[4px]">
            <Text className={"font-[500] text-[12px] md:text-[16px]"}>
              Delivery in
            </Text>{" "}
            <Text
              className={"font-[700] text-[12px] md:text-[16px] text-appBlue"}
            >
              {"24 Hours"}
            </Text>
          </div>
          <CartItemQuantityAndTenure
            cartItem={cartItem}
            availableTenure={cartItem?.available_tenure}
            quantity={cartItem?.quantity}
            tenure={cartItem?.tenure}
            variantUuid={cartItem?.uuid}
            refetch={refetch}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
