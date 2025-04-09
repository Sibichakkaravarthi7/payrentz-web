import React, { useContext, useEffect } from "react";
import AppImage from "../Image/AppImage";
import Text from "../Text/Text";
import Link from "next/link";
import { LocationIcon } from "@/Icons";
import { NavContext } from "./NavbarContainer";
import useAppStore from "@/Store/Store";
import { usePathname } from "next/navigation";

const NavMenuLinks = ({ closeSidebar }) => {
  const { openLocationModal, setIsLocationChangeOn } = useAppStore();

  const handleLocationChange = () => {
    setIsLocationChangeOn({ val: true });
    openLocationModal();
    closeSidebar && closeSidebar();
  };

  const { city, pincode, categories } = useContext(NavContext);

  // console.log("location", city, pincode, categories);

  // const navlinks = [
  //   {
  //     text: "Appliances",
  //     link: "appliances",
  //     icon: WashingMachine,
  //   },
  //   {
  //     text: "Furniture",
  //     link: "",
  //     icon: Sofa,
  //   },
  //   {
  //     text: "Packages",
  //     link: "",
  //     icon: Packages,
  //   },
  // ];
  const pathname = usePathname();
  const cleanPathname = pathname?.split("/").filter(Boolean)[0] || "";

  return (
    <div className="flex ml-[20px] xl:ml-[30px]">
      <div className="flex gap-x-[8px] items-center ">
        <div className="flex gap-x-[30px] flex-col xl:flex-row items-start xl:items-center gap-y-[20px] nav-scroll-container">
          {city ? (
            <div
              className="flex gap-x-[14px] xl:gap-x-[8px] items-center cursor-pointer"
              onClick={() => handleLocationChange()}
            >
              <AppImage height="auto" src={LocationIcon} loading="lazy" />{" "}
              <div>
                {city ? (
                  <Text
                    className={"text-base xl:text-sm font-semibold capitalize"}
                  >
                    {cleanPathname == "chennai"
                      ? "Chennai"
                      : cleanPathname == "coimbatore"
                      ? "Coimbatore"
                      : city}
                  </Text>
                ) : null}
                {pincode ? (
                  <Text className={"text-xs text-[#858585] font-semibold"}>
                    {(city == "Chennai" && cleanPathname == "chennai") ||
                    (city == "Coimbatore" && cleanPathname == "coimbatore")
                      ? pincode
                      : cleanPathname == "chennai"
                      ? "600012"
                      : cleanPathname == "coimbatore"
                      ? "641401"
                      : pincode}
                  </Text>
                ) : null}
              </div>
            </div>
          ) : null}
          {cleanPathname == "sitemap"
            ? null
            : categories?.map((_) => (
                <Link
                  onClick={closeSidebar ? closeSidebar : null}
                  key={"/" + _?.slug}
                  href={`/${city?.toLowerCase()}/${_?.slug}`}
                >
                  <div className="flex gap-x-[12px] xl:gap-x-[7px] items-center">
                    {/* <AppImage className="h-[17px] w-[17px]" width={17} height={17} src={_?.image_detail?.file} /> */}
                    <Text
                      className={
                        "text-base xl:text-sm font-semibold whitespace-nowrap"
                      }
                    >
                      {_?.identity}
                    </Text>
                  </div>
                </Link>
              ))}
          {cleanPathname == "sitemap" ? null : (
            <Link
              onClick={closeSidebar ? closeSidebar : null}
              href={`/${city?.toLowerCase()}/combo`}
            >
              <div className="flex gap-x-[12px] xl:gap-x-[7px] items-center">
                {/* <AppImage className="h-[17px] w-[17px]" width={17} height={17} src={_?.image_detail?.file} /> */}
                <Text
                  className={
                    "text-base xl:text-sm font-semibold whitespace-nowrap"
                  }
                >
                  Packages
                </Text>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavMenuLinks;
