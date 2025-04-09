import React from "react";
import { RectShape, TextRow } from "react-placeholder/lib/placeholders";

const ProductBoxViewSkeleton = ({ isAccessories, dontShowMonth = false }) => {
  // const color = "#DCE0E6";
  const color = "rgb(220 224 230 / 34%)";
  return (
    <div className={`max-w-[295px] flex flex-col p-[5px] rounded-[10px] `}>
      <div
        className={`h-[134px] ${
          isAccessories ? "md:h-[250px]" : " md:h-[262px]"
        } relative`}
      >
        <RectShape
          color={color}
          className="rounded-[10px]"
          showLoadingAnimation={true}
          style={{ heigh: "100%", width: "100%" }}
        />
      </div>
      <div
        className={`mb-[5px] ${isAccessories ? "md:my-[7px]" : "md:my-[10px]"}`}
      >
        <TextRow
          color={color}
          showLoadingAnimation={true}
          style={{ width: "29%", marginTop: "7px" }}
        />
      </div>
      <div
        className={`text-ellipsis overflow-hidden ${
          isAccessories
            ? "text-[8px] md:text-[15px]"
            : "text-[10px] md:text-[18px]"
        } font-bold capitalize whitespace-pre md:mb-[1px]`}
      >
        <TextRow
          color={color}
          showLoadingAnimation={true}
          style={{ width: "55%", marginTop: "4px" }}
        />
      </div>
      <div>
        <div className="hidden block">
          <TextRow
            color={color}
            showLoadingAnimation={true}
            style={{ width: "40%", marginTop: "7px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductBoxViewSkeleton;
