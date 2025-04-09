"use client";
import { PayrentzLogo } from "@/Icons";
import AppLink from "../Link/AppLink";
import AppImage from "../Image/AppImage";

import useAppStore from "@/Store/Store";

const FooterDynamicPath = () => {
  const { city } = useAppStore();
  return (
    <AppLink link={`/${city?.toLowerCase()}`}>
      <AppImage
        src={PayrentzLogo}
        className="mt-[19px] w-[114px] md:w-[177px]"
      />
    </AppLink>
  );
};

export default FooterDynamicPath;
