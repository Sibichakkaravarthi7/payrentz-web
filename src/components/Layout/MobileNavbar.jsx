"use client";

import React, { useContext, useState } from "react";
import AppContainer from "../Container/AppContainer";
import AppImage from "../Image/AppImage";
import PayrentzLogo from "../../../public/logo/payrentz-logo.svg";
import { HamMenuIcon } from "@/Icons";
import MobileSidebar from "../MobileSidebar";
import AppLink from "../Link/AppLink";
import { NavContext } from "./NavbarContainer";
import UserLoginAvatarHandler from "../UserLoginAvatarHandler";
import CartIconWithCount from "./CartIconWithCount";
import useAppStore from "@/Store/Store";

const MobileNavbar = ({ cartCount, refreshData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { onOpenLoginModal } = useContext(NavContext);
  const isLead = refreshData?.data?.is_lead;

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const { city } = useAppStore();
  return (
    <div className="bg-white block xl:hidden md:px-[19px] py-[20px] z-[15]">
      <AppContainer>
        <div className="flex justify-between">
          <div className="flex gap-[18px] object-none">
            <AppImage
              src={HamMenuIcon}
              className="max-w-[114px] md:max-w-[122px]"
              onClick={() => setIsOpen(true)}
            />
            <AppLink link={`/${city?.toLowerCase()}`}>
              <AppImage
                src={PayrentzLogo}
                className="max-w-[114px] md:max-w-[122px]"
                loading="lazy"
              />
            </AppLink>
          </div>
          <div className="flex items-center justify-center  gap-[21px] ">
            {/* <AppButton
              onClick={() => onOpenLoginModal()}
              variant={"red"}
              text={"Login"}
            /> */}
            <UserLoginAvatarHandler isLead={isLead} />
            {/* <Link className="flex items-center" href={"/cart"}>
              <AppImage src={CartIcon} height="24px" width="24px" />
            </Link> */}
            <CartIconWithCount cartCount={cartCount} />
          </div>
        </div>
      </AppContainer>
      <MobileSidebar isOpen={isOpen} closeSidebar={closeSidebar} />
    </div>
  );
};

export default MobileNavbar;
