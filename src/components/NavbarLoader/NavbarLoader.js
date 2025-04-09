import React from "react";
import AppContainer from "../Container/AppContainer";
import AppLink from "../Link/AppLink";
import AppImage from "../Image/AppImage";
import { PayrentzLogo } from "@/Icons";
import NavSerachBar from "../NavSerachBar";
import CartIconWithCount from "../Layout/CartIconWithCount";
import UserLoginAvatarHandler from "../UserLoginAvatarHandler";

const NavbarLoader = () => {
  return (
    <div>
      <div className="bg-white min-h-[70px] hidden xl:block">
        <AppContainer>
          <div className="flex justify-between py-[13px]">
            <div className="flex items-center">
              <AppLink link={"/"}>
                <AppImage
                  src={PayrentzLogo}
                  className="max-w-[114px] md:max-w-[122px]"
                  loading="lazy"
                />
              </AppLink>

              {/* <NavMenuLinks /> */}
            </div>
            <div className="flex items-center gap-[30px]">
              <NavSerachBar />
              <CartIconWithCount cartCount={0} />

              {/* <UserLoginAvatarHandler /> */}
            </div>
          </div>
        </AppContainer>
      </div>
    </div>
  );
};

export default NavbarLoader;
