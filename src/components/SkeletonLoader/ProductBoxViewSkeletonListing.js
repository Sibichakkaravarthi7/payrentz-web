import React from "react";
import ProductBoxViewSkeleton from "./ProductBoxViewSkeleton";

const ProductBoxViewSkeletonListing = ({ count = 4 }) => {
  return (
    // <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-[13px] gap-x-[14px] md:gap-[34px]">
    <>
      {" "}
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <ProductBoxViewSkeleton key={index} />
        ))}
    </>
    // </div>
  );
};

export default ProductBoxViewSkeletonListing;
