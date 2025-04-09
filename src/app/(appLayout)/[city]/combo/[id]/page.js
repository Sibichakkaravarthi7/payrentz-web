import { COMBO_PAGE_URL } from "@/api/urls/urls";
import { getHostAPIUrl } from "@/appConfig";
import AppBreadcrumb from "@/components/Breadcrumb/AppBreadcrumb";
import AppContainer from "@/components/Container/AppContainer";
import PrevRentedProductsCombo from "@/components/ProductDetails/PrevRentedProductsCombo";
import ProductSubPage from "@/components/ProductDetails/ProductSubPage";
import React from "react";

export const generateMetadata = ({ params }) => ({
  title: `Rental Packages | PayRentz`,
  description: `Since most of us need and hire more than one appliances to facilitate customers PayRentz like to offer appliances on rental package with huge benefits.`,
  alternates: {
    canonical: `https://payrentz-website-uat.vercel.app/${params?.city}/combo/${params?.id}`,
  },
  robots: "index, follow",
});

async function getComboDetails(comboUuid) {
  const res = await fetch(getHostAPIUrl() + COMBO_PAGE_URL(comboUuid), {
    next: {
      // revalidate: 10,
      tags: ["all", comboUuid],
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Page = async ({ params }) => {
  const comboDetails = await getComboDetails(params?.id);

  const breadcrumbList = [
    {
      text: "home",
      link: "/",
    },
    {
      text: "Combo",
      link: "/combo",
    },
    {
      text: comboDetails?.identity,
      link: "",
    },
  ];

  return (
    <>
      <AppContainer>
        <AppBreadcrumb list={breadcrumbList} />
      </AppContainer>
      <ProductSubPage variantDetail={comboDetails} />
      <AppContainer>
        <PrevRentedProductsCombo />
      </AppContainer>
    </>
  );
};

export default Page;
