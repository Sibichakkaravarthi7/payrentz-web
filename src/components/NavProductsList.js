"use client";
import React from "react";
import AppLink from "./Link/AppLink";
import { SET_SUB_CATEGORY_PATH } from "@/utils/Constants";
import { usePathname, useRouter } from "next/navigation";
import useAppStore from "@/Store/Store";

const NavProductsList = ({ subCategories }) => {
  // console.log("subcategoriesssss", subCategories)
  const { city } = useAppStore();
  const currentPath = usePathname();

  const pathParts = currentPath?.split("/");
  const routeName = pathParts[pathParts.length - 1];
  const cityData = city?.toLowerCase();
  return (
    <>
      {routeName === "about-us" ? null : (
        <div className="bg-appBlue ">
          <div className="flex gap-[20px] md:gap-[30px] px-[19px] py-[14px] md:py-[10px] justify-start nav-scroll-container w-full max-w-[1200px] mx-auto justify-start">
            {subCategories?.slice(0, 10)?.map((p) => (
              <AppLink
                className={
                  "whitespace-nowrap text-xs md:text-sm font-bold text-white block hover:scale-[102%]"
                }
                link={SET_SUB_CATEGORY_PATH(
                  cityData,
                  p?.category_detail?.slug,
                  p?.slug
                )}
                text={p?.identity}
                key={p?.uuid}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavProductsList;
