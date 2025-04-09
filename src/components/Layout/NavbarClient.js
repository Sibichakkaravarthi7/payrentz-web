"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import NavProductsList from "../NavProductsList";
import NavBarMobileSearchBox from "./NavBarMobileSearchBox";

const NavbarClient = ({ navigationData }) => {
  const [pathname, setPathname] = useState("");
  const currentPathname = usePathname(); // Get pathname on client side

  useEffect(() => {
    setPathname(currentPathname);
  }, [currentPathname]);
  // Check if pathname is exactly "/Chennai/sitemap" or any similar structure
  const isSitemapPage = pathname?.includes("/sitemap");
  return (
    <>
      <NavBarMobileSearchBox />
      {!isSitemapPage && (
        <NavProductsList subCategories={navigationData?.data?.sub_category} />
      )}
    </>
  );
};

export default NavbarClient;
