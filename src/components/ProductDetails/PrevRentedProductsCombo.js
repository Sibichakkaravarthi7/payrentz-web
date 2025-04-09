import React from "react";
import Text from "../Text/Text";
import ProductListing from "../ProductListing";
import { dummyProductsList } from "@/utils/Constants";
import { GET_PPL_ALSO_RENTED_DATA } from "@/api/urls/urls";
import { getHostAPIUrl } from "@/appConfig";

async function getPplAlsoRentedData(productUuid) {
  const res = await fetch(getHostAPIUrl() + GET_PPL_ALSO_RENTED_DATA, {
    next: {
      tags: ["all", "variant"],
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function PrevRentedProductsCombo({ idToFilter }) {
  const variantDetail = await getPplAlsoRentedData();
  const vatToShow = variantDetail?.data?.results
    ?.filter((f) => f?.uuid !== idToFilter)
    ?.slice(0, 4);
  return (
    <div>
      {variantDetail?.data?.results?.length > 0 ? (
        <>
          <Text
            as="h3"
            className={
              "text-[#2B5CAB] text-2xl font-extrabold pt-[40px] pb-[30px]"
            }
          >
            People Also Rented
          </Text>
          <div className="px-[10px]">
            <ProductListing data={vatToShow} />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default PrevRentedProductsCombo;
