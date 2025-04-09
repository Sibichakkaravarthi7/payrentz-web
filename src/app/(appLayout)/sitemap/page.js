import {
  GET_ALL_VARIANTS_FOR_SEO,
  NAVIGATION_META_URL,
  SITEMAP_SUBCAT_URL,
} from "@/api/urls/urls";
import { getHostAPIUrl } from "@/appConfig";
import Layout from "@/components/Layout/Layout";
import SitemapClient from "@/components/SitemapClient";
import React from "react";

export async function getStaticPaths() {
  const paths = [
    { params: { city: "chennai" } },
    { params: { city: "coimbatore" } },
  ];
  return { paths, fallback: false };
}
const getDynamicVariantsPages = async () => {
  const dynamicVariantsPages = await fetch(
    getHostAPIUrl() + GET_ALL_VARIANTS_FOR_SEO
  );
  return dynamicVariantsPages.json();
};

const getDynamicCategoryPages = async () => {
  const dynamicVariantsPages = await fetch(
    getHostAPIUrl() + NAVIGATION_META_URL
  );
  return dynamicVariantsPages.json();
};
const getDynamicSubCategoryPages = async () => {
  const dynamicSubCatPages = await fetch(getHostAPIUrl() + SITEMAP_SUBCAT_URL);
  return dynamicSubCatPages.json();
};

export default async function page() {
  //   get dynamic data pages
  const dynamicVariantsPages = await getDynamicVariantsPages();
  const dynamicCategoryPages = await getDynamicCategoryPages();
  const dynamicSubCategoryPages = await getDynamicSubCategoryPages();

  return (
    <Layout>
      <SitemapClient
        dynamicVariantsPages={dynamicVariantsPages}
        dynamicCategoryPages={dynamicCategoryPages}
        dynamicSubCategoryPages={dynamicSubCategoryPages}
      />
    </Layout>
  );
}
