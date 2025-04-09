"use client";
import React, { useEffect, useState } from "react";
import ProductBoxView from "./productBoxView/ProductBoxView";
import { SET_PRODUCT_VIEW_PATH } from "@/utils/Constants";
import ProductBoxViewSkeletonListing from "./SkeletonLoader/ProductBoxViewSkeletonListing";
import ResultsNotFound from "./ResultsNotFound";
import IntersectionObserverForListing from "./IntersetionObserver/IntersectionObserverForListing";
import { useMutation } from "react-query";
import makePostRequest from "@/utils/makePostRequest";
import { GET_RECOMMENDATION } from "@/api/urls/urls";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

const ProductListingDetail = ({ variantDetail }) => {
  const [recommendation, setRecommendation] = useState([]);
  const { isLoading: recommendationLoading, mutate: recommendationMutate } =
    useMutation((body) => makePostRequest(GET_RECOMMENDATION, body), {
      onSuccess: (res) => {
        setRecommendation(res?.data?.variants);
      },
      onError: (error) => {
        toast.error("Something went wrong");
      },
    });
  useEffect(() => {
    recommendationMutate({ variant: variantDetail?.uuid });
  }, []);
  const pathname = usePathname();
  const cleanPathname = pathname?.split("/").filter(Boolean)[0] || "";
  return (
    <div>
      {recommendationLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-[13px] gap-x-[14px] md:gap-[34px] ">
          <ProductBoxViewSkeletonListing count={8} />
        </div>
      ) : (
        <>
          {recommendation?.length > 0 ? (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-[13px] gap-x-[14px] md:gap-[34px]">
                {recommendation?.map((m) => (
                  <div key={m?.id}>
                    <ProductBoxView
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
                      link={SET_PRODUCT_VIEW_PATH(
                        `${cleanPathname}`?.replace("//", "/"),
                        m?.category_detail?.slug,
                        m?.slug
                      )}
                      obj={m}
                    />
                  </div>
                ))}
              </div>
              <IntersectionObserverForListing

              // isLoading={false}
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

export default ProductListingDetail;
