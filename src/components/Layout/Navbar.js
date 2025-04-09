"use client";
// import DesktopNavbar from "./DesktopNavbar";
// import MobileNavbar from "./MobileNavbar";
import NavProductsList from "../NavProductsList";
// import NavbarContainer from "./NavbarContainer";
import { GET_CITY_WITH_PINCODE, NAVIGATION_META_URL } from "@/api/urls/urls";
import { getHostAPIUrl } from "@/appConfig";
import { errorPagehandler } from "@/utils/Constants";
import NavBarMobileSearchBox from "./NavBarMobileSearchBox";
import { Suspense } from "react";
import NavbarLoader from "../NavbarLoader/NavbarLoader";
import dynamic from "next/dynamic";
import ClientPathname from "../ClientPathname";
import NavbarClient from "./NavbarClient";
import makeGetRequest from "@/utils/makeGetRequest";
import { useQuery } from "react-query";

// import { notFound } from "next/navigation";

// Dynamically import NavbarContainer
const DynamicNavbarContainer = dynamic(
  () => import("../../components/Layout/NavbarContainer"),
  { ssr: false }
);

export default function Navbar() {
  const { data: navigation, isLoading: navigationIsLoading } = useQuery(
    [NAVIGATION_META_URL],
    () => makeGetRequest(NAVIGATION_META_URL)
  );
  const { data: city, isLoading: cityIsLoading } = useQuery(
    [GET_CITY_WITH_PINCODE],
    () => makeGetRequest(GET_CITY_WITH_PINCODE)
  );
  const navigationData = navigation;
  const cityData = city;
  // console.log("NAVIGATION_META_URL", navigationData);
  const isLoading = navigationIsLoading || cityIsLoading;

  if (isLoading) {
    return <NavbarLoader />;
  }
  return (
    <div className="sticky top-0 z-[15]">
      <Suspense fallback={<NavbarLoader />}>
        <DynamicNavbarContainer
          navigationData={navigationData}
          categories={navigationData?.data?.categories}
          cityData={cityData}
        />
      </Suspense>

      {/* <NavBarMobileSearchBox /> */}
      <NavbarClient navigationData={navigationData} />
    </div>
  );
}
