import React from "react";
import AppImage from "../Image/AppImage";
import { SideBanner1, SideBanner2 } from "@/Icons";

const HeroSideBanner = () => {
  return (
    <div className="hidden xl:block">
      <div className="flex flex-row xl:flex-col gap-y-[20px] flex-1 w-full gap-x-[9px] ">
        <div className="flex-1">
          <AppImage
            width={409}
            height={176}
            className="rounded-[10px]  h-[110%] md:h-[100%]"
            src={SideBanner1}
            priority={true}
            loading={"eager"}
            srcSet={SideBanner1}
            alt="side-banner"
          />
        </div>

        <div className="flex-1">
          <AppImage
            width={409}
            height={176}
            className="rounded-[10px] h-[110%] md:h-[100%]"
            src={SideBanner2}
            priority={true}
            loading={"eager"}
            srcSet={SideBanner2}
            alt="side-banner"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSideBanner;
