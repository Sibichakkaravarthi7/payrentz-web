import AppBreadcrumb from "@/components/Breadcrumb/AppBreadcrumb";
import AppContainer from "@/components/Container/AppContainer";
import { errorPagehandler } from "@/utils/Constants";
import React from "react";
import VariantsWithFilter from "@/components/VariantsWithFilter";
import {
  GET_META_TITLE_AND_DESC,
  SUBCATEGORY_LIST_BY_CATEGORY_URL,
  VARIANT_DETAIL_PAGE_URL,
} from "@/api/urls/urls";
import { getHostAPIUrl } from "@/appConfig";
import { redirect } from "next/navigation";
import ProductSubPage from "@/components/ProductDetails/ProductSubPage";
import PrevRentedProducts from "@/components/ProductDetails/PrevRentedProducts";

// export const generateMetadata = ({ params }) => ({
//   title: `Rent on ${params?.category} | PayRentz`,
//   description: `Rent on ${params?.category} in ${params?.city} from PayRentz`,
//   keywords: `Home Appliances on rent in ${params?.city}, Rental washing Machines in ${params?.city}, Laptops for rent in ${params?.city}. Cycle & Fitness equipment rental in ${params?.city}.`,
//   alternates: {
//     canonical: `https://www.payrentz.com/${params?.city}/${params?.category}`,
//   },
// });
export async function generateMetadata({ params }) {
  const id = params?.subcategory;

  const type = params?.subcategory?.includes("on-rent")
    ? "subcategory"
    : "variant";
  const product = await fetch(
    getHostAPIUrl() + GET_META_TITLE_AND_DESC(type, id, params?.city),
    {
      next: {
        revalidate: 30,
        tags: ["all", type, id, params?.city],
      },
    }
  ).then((res) => res.json());

  const data = product?.data?.results;

  if (data?.[0]?.title)
    return {
      title: data?.[0]?.title,
      description: data?.[0]?.description,
      h1_tag: data?.[0]?.h1_tag,
      alternates: {
        canonical: `https://www.payrentz.com/${params?.city}/${params?.category}/${params?.subcategory}`,
      },
      robots: "index, follow",
    };
}
async function getVariantDetails(productUuid) {
  const res = await fetch(
    getHostAPIUrl() + VARIANT_DETAIL_PAGE_URL(productUuid),
    {
      next: {
        // revalidate: 10,
        tags: ["all", productUuid],
      },
    }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getData(uuid) {
  const res = await fetch(
    getHostAPIUrl() + SUBCATEGORY_LIST_BY_CATEGORY_URL(uuid),
    {
      next: {
        tags: ["all"],
      },
    }
  );
  errorPagehandler(res?.status);

  return res.json();
}
const allowedCities = ["coimbatore", "chennai"];
const page = async (props) => {
  if (
    !props?.params ||
    !props?.params.city ||
    !allowedCities.includes(props?.params?.city)
  ) {
    redirect("/chennai"); // Redirect to Chennai if city is invalid
  }
  const metaData = await generateMetadata(props);

  const variantDetail = props?.params?.subcategory?.includes("on-rent")
    ? null
    : await getVariantDetails(props?.params?.subcategory);
  const categoryUuid = props?.params?.category;

  const subCategoryList = props?.params?.subcategory?.includes("on-rent")
    ? await getData(categoryUuid)
    : null;

  const BreadcrumbList = [
    {
      text: "home",
      link: `/${props?.params?.city}`,
    },
    {
      text: subCategoryList?.data?.[0]?.category_detail?.identity,
      link: "",
    },
  ];
  const breadcrumbList2 = [
    {
      text: "home",
      link: `/${props?.params?.city}`,
    },
    {
      text: variantDetail?.category_detail?.identity,
      link: `/${props?.params?.city}/` + variantDetail?.category_detail?.slug,
    },
    {
      text: variantDetail?.identity,
      link: "",
    },
  ];
  return (
    <>
      {props?.params?.subcategory?.includes("on-rent") ? (
        <AppContainer>
          <AppBreadcrumb list={BreadcrumbList} />
          <VariantsWithFilter
            list={subCategoryList?.data}
            category_name={categoryUuid}
            seoTag={metaData?.h1_tag}
          />
        </AppContainer>
      ) : (
        <>
          <AppContainer>
            <AppBreadcrumb list={breadcrumbList2} />
          </AppContainer>
          <ProductSubPage
            variantDetail={variantDetail}
            seoTag={metaData?.h1_tag}
          />
          <AppContainer>
            <PrevRentedProducts
              variantDetail={variantDetail}
              idToFilter={props?.params?.subcategory}
            />
          </AppContainer>
        </>
      )}
    </>
  );
};

export default page;
