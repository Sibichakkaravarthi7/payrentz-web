import React from "react";
import Text from "../Text/Text";
import { RectShape, TextRow } from "react-placeholder/lib/placeholders";
import { skeletonColor } from "@/utils/Constants";

const CartItemSkeleton = () => {
  return (
    <div className={`flex justify-between px-[7px] md:px-[10px] `}>
      <div className="flex gap-[12px] md:gap-[19px] py-[10px] md:py-[20px] w-full">
        <div className="md:max-w-[130px] md:h-[116px] max-w-[85px] h-[80px] w-full">
          <RectShape
            color={skeletonColor}
            className="rounded-[10px]"
            showLoadingAnimation={true}
            style={{ heigh: "100%", width: "100%" }}
          />
        </div>
        <div className="gap-[7px] md:gap-[10px] flex flex-col w-full">
          <div className="flex justify-between gap-[15px]">
            <TextRow
              color={skeletonColor}
              showLoadingAnimation={true}
              style={{ width: "32%", marginTop: "0px" }}
            />

            <TextRow
              color={skeletonColor}
              showLoadingAnimation={true}
              style={{ width: "10%", marginTop: "0px" }}
            />
          </div>
          <div>
            <TextRow
              color={skeletonColor}
              showLoadingAnimation={true}
              style={{ width: "22%" }}
            />
            <TextRow
              color={skeletonColor}
              showLoadingAnimation={true}
              style={{ width: "30%" }}
            />
          </div>
          <div className="flex items-center gap-[4px] hidden md:flex">
            <TextRow
              color={skeletonColor}
              showLoadingAnimation={true}
              style={{ width: "30%", marginTop: "0px" }}
            />
          </div>
          <div className="flex items-center gap-[4px] mt-[-10px] md:mt-[0]">
            <TextRow
              color={skeletonColor}
              showLoadingAnimation={true}
              style={{ width: "50%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemSkeleton;
