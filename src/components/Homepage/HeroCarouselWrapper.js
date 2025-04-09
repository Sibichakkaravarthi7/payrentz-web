"use client";
import React from "react";
import dynamic from "next/dynamic";

const HeroCarouselKeenSlider = dynamic(() =>
  import("../Carousel/HeroCarouselKeenSlider")
);
const HeroCarouselKeenSliderMobile = dynamic(() =>
  import("../Carousel/HeroCarouselKeenSliderMobile")
);
const HeroCarouselWrapper = () => {
  return (
    <div className="relative w-full hero-carousel-cont">
      <HeroCarouselKeenSlider />
      <HeroCarouselKeenSliderMobile />
      {/* <div className="text-white flex flex-col justify-center absolute top-0 left-0 w-full items-center bottom-0">
        <Text className={"text-[24px]] md:text-[60px] font-extrabold"} as="h1">
          Create a great home.
        </Text>
        <Text
          className={
            "text-[12px]] md:text-[24px] font-semibold md:mt-[5px] mb-[10px]"
          }
        >
          Customized rental solutions for you.
        </Text>
        <AppButton
          target={"_blank"}
          className={"hover-darken-bg"}
          link={"/product/all"}
          variant={"red"}
          text={"Explore Products"}
        />
      </div> */}
    </div>
  );
};

export default HeroCarouselWrapper;
