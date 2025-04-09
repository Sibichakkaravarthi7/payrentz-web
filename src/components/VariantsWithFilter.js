"use client";
import React, { useEffect, useRef, useState } from "react";
import ProductListing from "./ProductListing";
import SmallSubCatTopListing from "./SubCatAndVarinatsListing/SmallSubCatTopListing";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { VARIANT_LIST_URL } from "@/api/urls/urls";
import { useQuery } from "react-query";
import makeGetRequest from "@/utils/makeGetRequest";
import { useInView } from "react-intersection-observer";
import Text from "./Text/Text";

const VariantsWithFilter = ({ list, category_name = "", seoTag = "" }) => {
  const router = useRouter();
  const pathname = usePathname();
  const catPathname = pathname?.split("/").filter(Boolean)[1] || "";
  const subCatPathname = pathname?.split("/").filter(Boolean)[2] || "";

  const searchParams = useSearchParams();

  const subCatFromParams = searchParams?.getAll("sub_category");

  const [selectedVariant, setSelectedVariant] = useState(
    subCatFromParams || []
  );
  const [variantsList, setVariantsList] = useState([]);

  // console.log("variant list", variantsList);

  const page = useRef(1);
  const isChanged = useRef(true);

  const { ref, inView } = useInView();

  const subCat = subCatFromParams
    ?.map((item, ind) => `${ind == 0 ? "&" : ""}sub_category=${item}`)
    .join("&");

  const {
    data,
    isLoading: listIsLoading,
    isFetching,
    isRefetching,
    refetch,
  } = useQuery(
    [
      VARIANT_LIST_URL +
        "?" +
        `category=${list?.[0]?.category_detail?.id}&sub_category=${
          subCatPathname ? subCatPathname : ""
        }&page=${page.current}`,
      // isChanged.current,
      // +subCat,
      ,
    ],
    () =>
      makeGetRequest(
        VARIANT_LIST_URL +
          "?" +
          `category=${list?.[0]?.category_detail?.id}&sub_category=${
            subCatPathname ? subCatPathname : ""
          }&page=${page.current}`
      ),
    {
      onSuccess: (res) => {
        setVariantsList((prv) => [...prv, ...res?.data?.results]);
      },
      onError: (err) => {
        console.log(err);
      },
      // enabled: guestId ? true : false,
      // cacheTime: 0
    }
  );

  useEffect(() => {
    // console.log("is in view", inView);
    if (inView && data?.data?.next) {
      page.current = page.current + 1;
      refetch();
    }
  }, [inView]);

  // useEffect(() => {
  //   page.current = 1;
  //   // refetch();
  //   setVariantsList([]);
  //   isChanged.current = !isChanged.current;
  // }, [subCatFromParams]);

  useEffect(() => {
    page.current = 1;
    setVariantsList([]);
  }, [subCat]);

  const updateParams = (
    paramName,
    valuesToAdd = [],
    valuesToRemove = [],
    reset = false
  ) => {
    page.current = 1;
    if (valuesToAdd?.length > 0) {
      const queryParams = new URLSearchParams();
      // Add new values
      valuesToAdd?.forEach((value) => queryParams.append(paramName, value));
      // Update URL
      router?.push(pathname + "?" + queryParams.toString());
      return;
    }
    const queryParams = reset ? "" : new URLSearchParams(searchParams);
    // Remove specified values
    for (const value of valuesToRemove) {
      while (queryParams.delete(paramName, value)) {}
    }
    // Update URL
    router?.push(pathname + "?" + queryParams.toString());
  };

  // useEffect(() => {
  //   fetchVariants(searchParams?.getAll("subcategory"));
  // }, [selectedVariant]);

  return (
    <div>
      <div className="flex justify-between items-center border-b border-[#DBDBDB]">
        <SmallSubCatTopListing
          setSelectedVariants={setSelectedVariant}
          selectedVariants={subCatFromParams}
          list={list}
          updateParams={updateParams}
        />
      </div>

      <div className="pt-[30px]">
        <Text className={"font-bold  text-[20px] md:text-[20px]"}>
          {subCatPathname
            .replace("-on-rent", "") // Remove "-on-rent"
            .split("-") // Split words by hyphen
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
            .join(" ")}
        </Text>
        {seoTag && (
          <Text
            as="h1"
            className={"font-normal pt-[20px]  text-[20px] md:text-[20px]"}
          >
            {seoTag}
          </Text>
        )}
      </div>
      <div className="mt-[40px]">
        {/* variantsList?.results */}
        <ProductListing
          intersecRef={ref}
          isLoading={(listIsLoading || isRefetching) && page.current == 1}
          restPageLoading={page.current !== 1 && isFetching}
          data={page.current == 1 ? data?.data?.results : variantsList}
          category_name={category_name}
        />
      </div>
    </div>
  );
};

export default VariantsWithFilter;
