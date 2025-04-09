"use client";
import React, { useEffect } from "react";
import ProductBoxView from "./productBoxView/ProductBoxView";
import { SET_COMBO_VIEW_PAGE, SET_PRODUCT_VIEW_PATH } from "@/utils/Constants";
import ProductBoxViewSkeletonListing from "./SkeletonLoader/ProductBoxViewSkeletonListing";
import ResultsNotFound from "./ResultsNotFound";
import IntersectionObserverForListing from "./IntersetionObserver/IntersectionObserverForListing";
import {
  trackSelectItem,
  trackViewItemList,
} from "./Thirdparty/GoogleEventTracker";
import { usePathname } from "next/navigation";

const ProductListing = ({
  data,
  isLoading = false,
  intersecRef,
  restPageLoading,
  isCombo = false,
  category_name = "",
}) => {
  // console.log("isLoading", isLoading);
  // console.log("dataaaaaaassss", data);

  useEffect(() => {
    trackViewItemList(data, category_name);
  }, [data]);
  const pathname = usePathname();
  const cleanPathname = pathname?.split("/").filter(Boolean)[0] || "";
  return (
    <div>
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-[13px] gap-x-[14px] md:gap-[34px] ">
          <ProductBoxViewSkeletonListing count={8} />
        </div>
      ) : (
        <>
          {data?.length > 0 ? (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-[13px] gap-x-[14px] md:gap-[34px]">
                {data?.map((m) => (
                  <div
                    key={m?.id}
                    onClick={() => {
                      trackSelectItem(m, category_name);
                    }}
                  >
                    <ProductBoxView
                      isCombo={isCombo}
                      image={m?.image_detail?.[0]?.file || m?.image}
                      tag={m?.tag || "newly added"}
                      identity={m?.identity}
                      price={
                        m?.rent_12 ||
                        m?.rent_6 ||
                        m?.rent_3 ||
                        m?.rent_1 ||
                        m?.price
                      }
                      link={
                        isCombo
                          ? SET_COMBO_VIEW_PAGE(
                              `${cleanPathname}`?.replace("//", "/"),
                              m?.slug
                            )
                          : SET_PRODUCT_VIEW_PATH(
                              `${cleanPathname}`?.replace("//", "/"),
                              m?.category_detail?.slug,
                              m?.slug
                            )
                      }
                      obj={m}
                    />
                  </div>
                ))}
              </div>
              <IntersectionObserverForListing
                intersecRef={intersecRef}
                // isLoading={false}
                isLoading={restPageLoading}
              />
            </div>
          ) : (
            <ResultsNotFound />
          )}
        </>
      )}
    </div>
  );
};
export default ProductListing;
