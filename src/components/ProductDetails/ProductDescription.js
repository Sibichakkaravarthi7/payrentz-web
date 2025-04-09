"use client"
import React from "react";
import Text from "../Text/Text";

function ProductDescription({ id, details }) {
  return (
    <div>
      <div key={id} className="py-[20px] md:py-[40px] border-b-2 border-[#2B5CAB]">
        <Text as="h2" className={"font-extrabold text-2xl text-[#2B5CAB]"}>
          Description
        </Text>
        <div
          dangerouslySetInnerHTML={{ __html: details }}
          className={"font-medium text-[#2D2D2D] !leading-[26px] mt-[30px]"}
        ></div>
      </div>
    </div>
  );
}

export default ProductDescription;
