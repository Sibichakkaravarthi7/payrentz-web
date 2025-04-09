import React from "react";
import HeroCarouselWrapper from "./HeroCarouselWrapper";
import dynamic from "next/dynamic";

const HeroSideBanner = dynamic(() => import("./HeroSideBanner"));
const HeroSideBannerMobile = dynamic(() => import("./HeroSideBannerMobile"));
const HeroContent = () => {
  return (
    <div className="flex gap-y-[10px] md:gap-x-[20px] flex-col xl:flex-row mt-[20px]">
      <div className="w-full xl:max-w-[863px] md:h-[320px] lg:h-[372px]">
        <HeroCarouselWrapper />
      </div>
      <HeroSideBanner />
      <HeroSideBannerMobile />
    </div>
  );
};

export default HeroContent;
