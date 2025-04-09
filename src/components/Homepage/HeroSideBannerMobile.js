import React from "react";
import AppImage from "../Image/AppImage";
import { SideBanner1, SideBanner2 } from "@/Icons";

const HeroSideBannerMobile = () => {
  const banners = [
    {
      src: SideBanner1,
      alt: "side-banner 1",
      className: "sideBanner-mobile1",
    },
    {
      src: SideBanner2,
      alt: "side-banner 2",
      className: "sideBanner-mobile2",
    },
  ];
  return (
    <div className="block xl:hidden">
      <div className="flex  gap-y-[20px] min-h-[80px]   gap-x-[9px]  ">
        {banners?.map((banner, index) => (
          <div key={index} className="flex-1">
            <AppImage
              width={170}
              height={90}
              quality={70}
              className={`rounded-[10px] ${banner.className}`}
              src={banner.src}
              sizes="(max-width: 320px) 130px, (max-width: 375px) 160px, (max-width: 420px) 180px, 180px"
              priority={true}
              alt={banner.alt}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSideBannerMobile;
