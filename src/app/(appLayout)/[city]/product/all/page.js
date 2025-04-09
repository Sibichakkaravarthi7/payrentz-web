"use client";

import { GET_VARIANT_LIST } from "@/api/urls/urls";
import AppBreadcrumb from "@/components/Breadcrumb/AppBreadcrumb";
import AppContainer from "@/components/Container/AppContainer";
import ProductListing from "@/components/ProductListing";
import ResultsNotFound from "@/components/ResultsNotFound";
import makeGetRequest from "@/utils/makeGetRequest";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useQuery } from "react-query";

function Page() {
  const page = useRef(1);
  const [variantsList, setVariantsList] = useState([]);
  const validCities = ["chennai", "coimbatore"];
  const router = useRouter();
  const pathname = usePathname();
  const cleanPathname = pathname?.split("/").filter(Boolean)[0] || "";
  useEffect(() => {
    if (
      typeof cleanPathname == "string" &&
      !validCities.includes(cleanPathname)
    ) {
      router.push(`/${cleanPathname}/404`);
    }
  }, [cleanPathname, router, pathname]);
  const { data, isLoading, isFetching, refetch } = useQuery(
    [GET_VARIANT_LIST],
    () =>
      makeGetRequest(GET_VARIANT_LIST, {
        page: page.current,
      }),
    {
      onSuccess: (res) => {
        // console.log("all variants list", res);
        setVariantsList((prv) => [...prv, ...res?.data?.results]);
      },
    }
  );
  const { ref, inView } = useInView();

  const breadcrumbList = [
    {
      text: "home",
      link: `/${cleanPathname}`,
    },
    {
      text: "All Products",
      link: "",
    },
  ];

  useEffect(() => {
    // console.log("is in view", inView);
    if (inView && data?.data?.next) {
      page.current = page.current + 1;
      refetch();
    }
  }, [inView]);

  return (
    <>
      <AppContainer>
        <AppBreadcrumb list={breadcrumbList} />
      </AppContainer>
      <AppContainer>
        <div className="mt-[40px]">
          <ProductListing
            intersecRef={ref}
            isLoading={isLoading}
            restPageLoading={isFetching}
            data={variantsList}
          />
        </div>
        {/* <div className="mt-[40px]">
          {allVariant?.data?.count > 0 ? (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-[13px] gap-x-[14px] md:gap-[34px]">
                {allVariant?.data?.results?.map((m) => (
                  <ProductBoxView
                    image={m?.image_detail[0]?.file || m?.image}
                    tag={m?.tag || "newly added"}
                    identity={m?.identity}
                    link={SET_PRODUCT_VIEW_PATH(
                      m?.category_detail?.uuid,
                      m?.uuid
                    )}
                    price={
                      m?.rent_12 ||
                      m?.rent_6 ||
                      m?.rent_3 ||
                      m?.rent_1 ||
                      m?.price
                    }
                    obj={m}
                    key={m?.id}
                  />
                ))}{" "}
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
        </div> */}
      </AppContainer>
    </>
  );
}

export default Page;
