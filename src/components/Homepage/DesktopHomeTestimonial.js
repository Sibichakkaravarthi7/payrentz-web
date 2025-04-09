import React from "react";
import Text from "../Text/Text";
import AppImage from "../Image/AppImage";
import { TestimonialImage } from "@/Icons";
import TestimonialSlider from "../Carousal/TestimonialSlider";
import TestimonialSliderMobile from "../Carousal/TestimonialSliderMobile";

const DesktopHomeTestimonial = () => {
  return (
    <div className="flex justify-between relative">
      <div className="w-[100%] md:w-[48%] ">
        <Text className={"text-white text-center md:text-left"} as="h2">
          <Text className={"text-[18px] font-bold md:text-[40px]"}>
            Client Chronicles:
          </Text>
          <Text className={"text-[18px] font-bold md:text-[28px]"}>
            Unveiling Customer Journey!
          </Text>
        </Text>
        {/* <Carousel></Carousel> */}
        <div className="block md:hidden my-[30px] md:my-0">
          <TestimonialSliderMobile />
        </div>
        <AppImage
          className="md:mt-[59px]"
          src={TestimonialImage}
          loading="lazy"
          srcSet={TestimonialImage}
          alt="testimonial-image"
        />
      </div>
      <div className="hidden md:flex justify-between w-[46%]  gap-[40px] flex-col md:border-s-[2px] md:border-white">
        <TestimonialSlider />
      </div>
    </div>
  );
};

export default DesktopHomeTestimonial;
