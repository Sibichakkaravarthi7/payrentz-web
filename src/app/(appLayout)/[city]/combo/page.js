"use client";
import { GET_COMBO_LIST_URL } from "@/api/urls/urls";
import { getHostAPIUrl } from "@/appConfig";
import AppBreadcrumb from "@/components/Breadcrumb/AppBreadcrumb";
import AppContainer from "@/components/Container/AppContainer";
import ProductListing from "@/components/ProductListing";
import makeGetRequest from "@/utils/makeGetRequest";
import React from "react";
import { useInView } from "react-intersection-observer";
import { useQuery } from "react-query";

function Page() {
  const { data, isLoading } = useQuery(
    [GET_COMBO_LIST_URL],
    () => makeGetRequest(GET_COMBO_LIST_URL)
    // {
    //   onSuccess: (res) => {
    //     console.log("accessories list", res);
    //   },
    // }
  );

  const { ref, inView } = useInView();

  const breadcrumbList = [
    {
      text: "home",
      link: "/",
    },
    {
      text: "combo",
      link: "",
    },
  ];
  return (
    <>
      <AppContainer>
        <AppBreadcrumb list={breadcrumbList} />
      </AppContainer>
      <AppContainer>
        <div className="mt-[10px]">
          <ProductListing
            intersecRef={ref}
            isLoading={isLoading}
            restPageLoading={false}
            data={data?.data?.results}
            isCombo
          />
        </div>
      </AppContainer>

      <AppContainer>{/* <PrevRentedProducts /> */}</AppContainer>
    </>
  );
}

export default Page;
