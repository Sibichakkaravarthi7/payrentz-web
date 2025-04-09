import { GET_ALL_VARIANTS_FOR_SEO, NAVIGATION_META_URL } from "@/api/urls/urls";
import { getHostAPIUrl } from "@/appConfig";

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

export default async function sitemap() {
  const host = "https://www.payrentz.com";
  const staticPages = [
    { url: "https://www.payrentz.com/chennai", priority: 1 },
    { url: "https://www.payrentz.com/coimbatore", priority: 1 },
    { url: "https://www.payrentz.com/chennai/product/all" },
    { url: "https://www.payrentz.com/coimbatore/product/all" },
    { url: "https://www.payrentz.com/chennai/combo" },
    { url: "https://www.payrentz.com/coimbatore/combo" },
    { url: "https://www.payrentz.com/chennai/about-us" },
    { url: "https://www.payrentz.com/coimbatore/about-us" },
    { url: "https://www.payrentz.com/chennai/faq" },
    { url: "https://www.payrentz.com/coimbatore/faq" },
    { url: "https://www.payrentz.com/chennai/disclaimer" },
    { url: "https://www.payrentz.com/coimbatore/disclaimer" },
    { url: "https://www.payrentz.com/chennai/terms-and-conditions" },
    { url: "https://www.payrentz.com/coimbatore/terms-and-conditions" },
    { url: "https://www.payrentz.com/chennai/refund-policy" },
    { url: "https://www.payrentz.com/coimbatore/refund-policy" },
    { url: "https://www.payrentz.com/chennai/privacy-policy" },
    { url: "https://www.payrentz.com/coimbatore/privacy-policy" },
  ];

  const comboPages = [
    { url: "https://www.payrentz.com/chennai/combo/essential-package" },
    { url: "https://www.payrentz.com/chennai/combo/standard-package" },
    { url: "https://www.payrentz.com/chennai/combo/premium-package" },
    { url: "https://www.payrentz.com/chennai/combo/comfort-combo" },
    { url: "https://www.payrentz.com/chennai/combo/living-room-package" },
    { url: "https://www.payrentz.com/chennai/combo/basic-appliances-combo" },
    { url: "https://www.payrentz.com/coimbatore/combo/essential-package" },
    { url: "https://www.payrentz.com/coimbatore/combo/standard-package" },
    { url: "https://www.payrentz.com/coimbatore/combo/premium-package" },
    { url: "https://www.payrentz.com/coimbatore/combo/comfort-combo" },
    { url: "https://www.payrentz.com/coimbatore/combo/living-room-package" },
    { url: "https://www.payrentz.com/coimbatore/combo/basic-appliances-combo" },
  ];
  const dynamicVariantsPages = await getDynamicVariantsPages();
  const dynamicCategoryPages = await getDynamicCategoryPages();

  const dynamicVariantsPagesArr =
    dynamicVariantsPages?.data?.flatMap((m) => [
      {
        url: `${host}/chennai/${m?.category_detail?.slug}/${m?.slug}`,
        priority: 0.8,
      },
      {
        url: `${host}/coimbatore/${m?.category_detail?.slug}/${m?.slug}`,
        priority: 0.8,
      },
    ]) || [];
  const dynamicCategoryPagesArr =
    dynamicCategoryPages?.data?.categories?.flatMap((m) => [
      {
        url: `${host}/chennai/${m?.slug}`,
        priority: 0.8,
      },
      {
        url: `${host}/coimbatore/${m?.slug}`,
        priority: 0.8,
      },
    ]) || [];

  const structureUrl = (arr) => {
    return arr?.map((m) => ({
      url: `${m?.url}`,
      priority: m?.priority || 0.8,
    }));
  };

  return [
    ...structureUrl(staticPages),
    ...structureUrl(comboPages),
    ...dynamicCategoryPagesArr,
    ...dynamicVariantsPagesArr,
  ];
}
