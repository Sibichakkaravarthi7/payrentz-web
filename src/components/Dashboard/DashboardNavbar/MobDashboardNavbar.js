"use client"

import React, { useState } from "react";
import { CartIcon, HamMenuIcon, PayrentzLogo } from "@/Icons";
import Link from "next/link";
import AppContainer from "@/components/Container/AppContainer";
import AppImage from "@/components/Image/AppImage";
import AppLink from "@/components/Link/AppLink";
import AppButton from "@/components/Button/AppButton";
import UserLoginAvatarHandler from "@/components/UserLoginAvatarHandler";

function MobDashboardNavbar() {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white block xl:hidden md:px-[19px] py-[20px]">
      <AppContainer>
        <div className="flex justify-between">
          <div className="flex gap-[18px] object-none">
            <AppImage
              src={HamMenuIcon}
              className="max-w-[114px] md:max-w-[122px]"
              onClick={() => setIsOpen(true)}
            />
            <AppLink link={"/"}>
              <AppImage
                src={PayrentzLogo}
                className="max-w-[114px] md:max-w-[122px]"
              />
            </AppLink>
          </div>
          <div className="flex gap-[21px] itens-center">
            {/* <AppButton
            //   onClick={() => onOpenLoginModal()}
              variant={"red"}
              text={"Login"}
            /> */}
            {/* <UserLoginAvatarHandler /> */}
            <Link className="flex items-center" href={"/cart"}>
              <AppImage src={CartIcon} height="24px" width="24px" />
            </Link>
          </div>
        </div>
      </AppContainer>
      {/* <MobileSidebar isOpen={isOpen} closeSidebar={closeSidebar} /> */}
    </div>
  )
}

export default MobDashboardNavbar;
