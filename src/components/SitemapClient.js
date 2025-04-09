"use client";

import AppBreadcrumb from "@/components/Breadcrumb/AppBreadcrumb";
import AppContainer from "@/components/Container/AppContainer";
import AppImage from "@/components/Image/AppImage";
import AppLink from "@/components/Link/AppLink";
import Text from "@/components/Text/Text";
import { ChennaiIcon, CoimbatoreIcon } from "@/Icons";
import useAppStore from "@/Store/Store";

export default function SitemapClient({
  dynamicSubCategoryPages,
  dynamicVariantsPages,
  dynamicCategoryPages,
}) {
  const { city } = useAppStore();

  const host = "https://www.payrentz.com";

  const breadcrumbList = [
    { text: "home", link: `/${city?.toLowerCase()}` },
    { text: "sitemap", link: "" },
  ];

  const getDynamicVariantsArr = dynamicVariantsPages?.data?.map((m) => ({
    link: `${host}/${city?.toLowerCase()}/${m?.category_detail?.slug}/${
      m?.slug
    }`,
    text: `Rent ${m?.slug}`,
  }));
  const dynamicCategoryPagesArr = dynamicCategoryPages?.data?.categories?.map(
    (m) => ({
      link: `${host}/${city?.toLowerCase()}/${m?.slug}`,
      text: `Rent ${m?.slug}`,
    })
  );
  const dynamicSubCategoryPagesArr = dynamicSubCategoryPages?.data?.map(
    (m) => ({
      link: `${host}/${city?.toLowerCase()}/${m?.category_detail?.identity
        .toLowerCase()
        .replace(/\s+/g, "-")}/${m?.slug}`,
      text: `Rent ${m?.identity}`,
    })
  );
  const combos = [
    {
      slug: "basic-appliances-combo",
      link: "rent-fridge-washing-machine-combo",
    },
    { slug: "comfort-combo", link: "rent-wooden-cot-mattress-combo" },
    { slug: "essential-package", link: "rent-essential-applicances-combo" },
    { slug: "standard-package", link: "rent-standard-package" },
    { slug: "living-room-package", link: "rent-living-room-furniture-combo" },
    { slug: "premium-package", link: "rent-premium-applicances-combo" },
  ];
  const comboPages = combos?.map((m) => ({
    link: `${host}/${city?.toLowerCase()}/combo/${m?.link}`,
    text: `Rent ${m?.slug}`,
  }));
  return (
    <div className="bg-[#f5f7fa] mb-[-50px]">
      <AppContainer>
        <AppBreadcrumb list={breadcrumbList} />
      </AppContainer>
      <AppContainer>
        <div className="pt-[40px] flex flex-col gap-[20px] ">
          <div className="border-b border-[#DBDBDB] mb-[10px]">
            <div className="flex gap-[6px] pb-[10px] cursor-pointer loc-icon items-center">
              <div className="rounded-[100%] border flex items-center justify-center h-[50px] w-[50px]">
                <AppImage
                  height={50}
                  width={50}
                  className="rounded-[100%] h-[50px] w-[50px]"
                  src={city == "Chennai" ? ChennaiIcon : CoimbatoreIcon}
                />
              </div>
              <Text className="text-center text-[#ed1f28] ml-[5px] text-[23px] font-[600]">
                {city || "Chennai"}
              </Text>
            </div>
            <div className="grid ml-[60px] mb-[10px] grid-cols-[1] md:grid-cols-4 gap-y-[15px] gap-x-[36px] text-center md:text-left">
              {[
                ...(dynamicCategoryPagesArr || []),
                ...(dynamicSubCategoryPagesArr || []),
                ...(comboPages || []),
                ...(getDynamicVariantsArr || []),
              ]?.map((l, i) => (
                <AppLink
                  target="_blank"
                  className="text-[14px] capitalize"
                  key={i}
                  link={l?.link}
                  text={l?.text}
                />
              ))}
            </div>
          </div>
        </div>
      </AppContainer>
    </div>
  );
}
