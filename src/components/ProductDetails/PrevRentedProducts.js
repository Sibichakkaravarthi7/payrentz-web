import React from "react";
import Text from "../Text/Text";
import ProductListingDetail from "../ProductListingDetail";

async function PrevRentedProducts({ variantDetail }) {
  return (
    <div>
      <Text
        as="h3"
        className={"text-[#2B5CAB] text-2xl font-extrabold pt-[40px] pb-[30px]"}
      >
        People Also Rented
      </Text>
      <div className="px-[10px]">
        <ProductListingDetail variantDetail={variantDetail} />
      </div>
    </div>
  );
}
export default PrevRentedProducts;
