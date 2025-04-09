import AppBreadcrumb from "@/components/Breadcrumb/AppBreadcrumb";
import AppContainer from "@/components/Container/AppContainer";
import { errorPagehandler } from "@/utils/Constants";
import React from "react";
import VariantsWithFilter from "@/components/VariantsWithFilter";
import {
  GET_META_TITLE_AND_DESC,
  SUBCATEGORY_LIST_BY_CATEGORY_URL,
} from "@/api/urls/urls";
import { getHostAPIUrl } from "@/appConfig";
import { redirect } from "next/navigation";

// export const generateMetadata = ({ params }) => ({
//   title: `Rent on ${params?.category} | PayRentz`,
//   description: `Rent on ${params?.category} in ${params.city} from PayRentz`,
//   keywords: `Home Appliances on rent in ${params.city}, Rental washing Machines in ${params.city}, Laptops for rent in ${params.city}. Cycle & Fitness equipment rental in ${params.city}.`,
//   alternates: {
//     canonical: `https://www.payrentz.com/${params.city}/${params?.category}`,
//   },
// });
export async function generateMetadata({ params }) {
  const id = params?.category;

  const product = await fetch(
    getHostAPIUrl() + GET_META_TITLE_AND_DESC("category", id, params?.city),
    {
      next: {
        revalidate: 30,
        tags: ["all", id, params?.city],
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
        canonical: `https://www.payrentz.com/${params?.city}/${params?.category}`,
      },
      robots: "index, follow",
    };
}
async function getData(uuid) {
  const res = await fetch(
    getHostAPIUrl() + SUBCATEGORY_LIST_BY_CATEGORY_URL(uuid),
    {
      next: {
        tags: ["all", uuid],
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
    !props?.params?.city ||
    !allowedCities.includes(props?.params?.city)
  ) {
    redirect(`/${props?.params?.city}`);
  }
  const categoryUuid = props?.params?.category;
  const subCategoryList = await getData(categoryUuid);
  const metaData = await generateMetadata(props);
  const BreadcrumbList = [
    {
      text: "home",
      link: `/${props?.params.city}`,
    },
    {
      text: subCategoryList?.data?.[0]?.category_detail?.identity,
      link: "",
    },
  ];

  return (
    // <Layout>
    <AppContainer>
      <AppBreadcrumb list={BreadcrumbList} />
      <VariantsWithFilter
        list={subCategoryList?.data}
        category_name={categoryUuid}
        seoTag={metaData?.h1_tag}
      />
    </AppContainer>
    // </Layout>
  );
};

export default page;
