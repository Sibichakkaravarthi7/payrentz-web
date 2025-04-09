import React from "react";
import ProductBoxViewSkeletonListing from "../SkeletonLoader/ProductBoxViewSkeletonListing";

const IntersectionObserverForListing = ({ isLoading, intersecRef, inView }) => {
  return (
    <div
      ref={intersecRef}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-[13px] gap-x-[14px] md:gap-[34px]  mt-[13px] md:mt-[34px]"
    >
      {isLoading && true ? <ProductBoxViewSkeletonListing count={4} /> : null}
    </div>
  );
};

export default IntersectionObserverForListing;
