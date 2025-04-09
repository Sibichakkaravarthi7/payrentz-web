import { GET_ALL_CATEGORY, GET_COMBO_LIST_URL } from "@/api/urls/urls";
import { getHostAPIUrl } from "@/appConfig";
import AppBreadcrumb from "@/components/Breadcrumb/AppBreadcrumb";
import AppContainer from "@/components/Container/AppContainer";
import ResultsNotFound from "@/components/ResultsNotFound";
import ProductWithDetailsInside from "@/components/productBoxView/ProductWithDetailsInside";
import { SET_VARIANT_VIEW_PATH, errorPagehandler } from "@/utils/Constants";
import React from "react";

async function getAllCat() {
  const res = await fetch(getHostAPIUrl() + GET_ALL_CATEGORY);

  // notFound
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    errorPagehandler(res?.status);
  }

  return res.json();
}

const Page = async () => {
  const allCat = await getAllCat();

  // console.log("all categoriesssssss", allCat)

  const breadcrumbList = [
    {
      text: "home",
      link: "/",
    },
    {
      text: "Categories",
      link: "/category",
    },
  ];

  return (
    <>
      <AppContainer>
        <AppBreadcrumb list={breadcrumbList} />
      </AppContainer>
      <AppContainer>
        <div className="mt-[40px]">
          {allCat?.data?.count > 0 ? (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-[13px] gap-x-[14px] md:gap-[34px]">
                {allCat?.data?.results?.map((m, index) => (
                  <ProductWithDetailsInside
                    image={m?.image_detail?.file || m?.image}
                    tag={m?.tag || "newly added"}
                    identity={m?.identity}
                    link={SET_VARIANT_VIEW_PATH(m?.slug)}
                    obj={m}
                    key={m?.id}
                    index={index}
                  />
                ))}
              </div>
              {/* <IntersectionObserverForListing
                intersecRef={intersecRef}
                // isLoading={false}
                isLoading={restPageLoading}
              /> */}
            </div>
          ) : (
            <ResultsNotFound />
          )}
        </div>
      </AppContainer>
    </>
  );
};

export default Page;
