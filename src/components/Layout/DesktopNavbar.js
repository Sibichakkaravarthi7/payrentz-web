import React from "react";
import AppContainer from "../Container/AppContainer";
import AppImage from "../Image/AppImage";
import NavMenuLinks from "./NavMenuLinks";
import NavSerachBar from "../NavSerachBar";
import { PayrentzLogo } from "@/Icons";
import AppLink from "../Link/AppLink";
import UserLoginAvatarHandler from "../UserLoginAvatarHandler";
import CartIconWithCount from "./CartIconWithCount";
import { usePathname } from "next/navigation";
import useAppStore from "@/Store/Store";
const DesktopNavbar = ({ cartCount, refreshData }) => {
  const isLead = refreshData?.data?.is_lead;

  const pathname = usePathname();

  // console.log("isleeeeeeaddddd", isLead);
  const cleanPathname = pathname?.split("/").filter(Boolean)[0] || "";
  const Pathname2 = pathname?.split("/").filter(Boolean)[1] || "";
  const { city } = useAppStore();

  return (
    <div
      className={
        Pathname2 === "sitemap"
          ? "bg-white hidden xl:block border-b border-appBlue border-b-[3px] "
          : "bg-white hidden xl:block"
      }
    >
      <AppContainer>
        <div className="flex justify-between py-[13px]">
          <div className="flex items-center">
            <AppLink link={`/${city?.toLowerCase()}`}>
              <AppImage
                src={PayrentzLogo}
                className="max-w-[114px] md:max-w-[122px]"
                loading="lazy"
              />
            </AppLink>

            <NavMenuLinks />
          </div>
          {cleanPathname == "sitemap" ? null : (
            <div className="flex items-center gap-[30px]">
              <NavSerachBar />
              {/* <Link className="relative" href={"/cart"}>
              <div className="flex gap-x-[7px]">
                <AppImage src={CartIcon} />
                <Text className={"text-sm font-semibold"}>{"Cart"}</Text>
              </div>
              <Text className={`cart-count ${cartCount == 0 ? "bg-gray" : "bg-appRed"}`}>
                {cartCount || 0}
              </Text>
            </Link> */}
              <CartIconWithCount cartCount={cartCount} />

              <UserLoginAvatarHandler isLead={isLead} />
            </div>
          )}
          {cleanPathname == "sitemap" && (
            <div className="flex items-center gap-[30px]">
              <UserLoginAvatarHandler isLead={isLead} />
            </div>
          )}
        </div>
      </AppContainer>
    </div>
  );
};

export default DesktopNavbar;
