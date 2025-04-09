import React from "react";
import { Carousel } from "flowbite-react";
// import { productImages } from '@/utils/Constants';
import AppImage from "../Image/AppImage";

function ProductCarousel({ variantDetails }) {
  return (
    <div className="md:h-[100%]">
      <Carousel
        className="h-[336px] lg:hidden md:hidden w-[336px] !mx-auto"
        leftControl=""
        rightControl=""
      >
        {variantDetails?.image_detail?.map((i) => (
          <AppImage
            key={i?.file}
            src={i?.file}
            width={336}
            height={336}
            className="h-full"
            loading="lazy"
          />
        ))}
      </Carousel>
    </div>
  );
}

export default ProductCarousel;
